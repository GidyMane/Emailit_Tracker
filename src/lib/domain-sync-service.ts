import { createUrl } from './url-utils';

export interface DomainSyncResult {
  success: boolean;
  message: string;
  error?: string;
  data?: any;
}

export async function syncDomains(): Promise<DomainSyncResult> {
  try {
    console.log('Starting domain sync process...');
    
    // Validate API key is configured
    if (!process.env.EMAILIT_API_KEY) {
      console.error('EMAILIT_API_KEY not configured');
      return {
        success: false,
        message: 'EmailIt API key not configured',
        error: 'EmailIt API key not configured'
      };
    }

    // Get base URL for internal API calls
    const baseUrl = process.env.NEXTAUTH_URL || process.env.VERCEL_URL || 'http://localhost:3000';
    const apiUrl = createUrl(baseUrl, '/api/emailit/sending-domains');
    
    // Call the sending domains API
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Domain sync API call failed:', errorText);
      return {
        success: false,
        message: 'Failed to sync domains',
        error: errorText
      };
    }

    const result = await response.json();
    console.log('Domain sync completed successfully');
    
    return {
      success: true,
      message: 'Domain sync completed successfully',
      data: result
    };

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Domain sync error:', errorMessage);
    
    return {
      success: false,
      message: 'Domain sync failed due to internal error',
      error: errorMessage
    };
  }
}

export async function syncSingleDomain(domainId: string): Promise<DomainSyncResult> {
  try {
    console.log(`Starting sync for domain: ${domainId}`);
    
    if (!process.env.EMAILIT_API_KEY) {
      console.error('EMAILIT_API_KEY not configured');
      return {
        success: false,
        message: 'EmailIt API key not configured',
        error: 'EmailIt API key not configured'
      };
    }

    // Get base URL for internal API calls
    const baseUrl = process.env.NEXTAUTH_URL || process.env.VERCEL_URL || 'http://localhost:3000';
    const apiUrl = createUrl(baseUrl, `/api/dashboard/domain?id=${domainId}`);
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Domain sync failed for ${domainId}:`, errorText);
      return {
        success: false,
        message: `Failed to sync domain ${domainId}`,
        error: errorText
      };
    }

    const result = await response.json();
    console.log(`Domain sync completed for ${domainId}`);
    
    return {
      success: true,
      message: `Domain ${domainId} synced successfully`,
      data: result
    };

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error(`Domain sync error for ${domainId}:`, errorMessage);
    
    return {
      success: false,
      message: `Domain sync failed for ${domainId}`,
      error: errorMessage
    };
  }
}
