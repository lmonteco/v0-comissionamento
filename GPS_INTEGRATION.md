# GPS Integration

This document provides information about the GPS integration for the Sales Commission Management System.

## Overview

The system integrates with the GPS (Gestão de Produtos e Serviços) to fetch information about salespeople and sales data. This integration is crucial for the following features:

1. Auto-filling salesperson information when adding a new salesperson
2. Fetching sales data for commission calculations
3. Verifying goal achievement

## Integration Points

### Salespeople Management

When adding a new salesperson, the system:
1. Requires the user to enter the salesperson's code
2. Automatically fetches the salesperson's name from GPS
3. Allows the user to configure whether the salesperson is commissioned

### Sales Data

When calculating commissions, the system:
1. Fetches sales data from GPS for the specified period
2. Filters sales based on the configured products
3. Calculates commissions based on the achievement category and commission rates

## Implementation

The integration is implemented through the `GPSService` class, which provides methods for:

- Fetching salesperson information by code
- Searching for salespeople
- Fetching sales data for a specific period

## Configuration

To configure the GPS integration:

1. Update the GPS API endpoint in the environment variables:
   \`\`\`
   GPS_API_URL=https://api.example.com/gps
   GPS_API_KEY=your-api-key
   \`\`\`

2. Ensure the GPS API has the necessary endpoints:
   - `/salespeople/{code}` - Get salesperson by code
   - `/salespeople/search?query={query}` - Search for salespeople
   - `/sales?start={start}&end={end}` - Get sales for a period

## Testing

For testing purposes, the system includes a mock implementation of the GPS service that returns predefined data. This allows for testing the system without an actual GPS connection.

To use the mock implementation:
1. Set `GPS_USE_MOCK=true` in the environment variables
2. The system will use the mock data defined in `services/gps-service.ts`

## Troubleshooting

If you encounter issues with the GPS integration:

1. Check the API endpoint and key in the environment variables
2. Verify that the GPS API is accessible from the server
3. Check the logs for any error messages related to the GPS integration
4. Try using the mock implementation to verify that the rest of the system is working correctly
