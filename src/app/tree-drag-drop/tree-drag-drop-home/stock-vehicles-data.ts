export const stockVehicleData = {
  data: [
    {
      id: '257555',
      type: 'stockVehicle',
      links: {
        self: 'https://portaltest.emilfrey.ch:443/_wsE122_dealer-vehicles-api/resources/stock-vehicles/257555',
      },
      attributes: {
        customerExists: false,
        dealerNumber: '366560',
        dealerId: 22597,
        declarationExists: true,
        exchangeLock: true,
        modelDescription: 'NINJA H2 SX SE+',
        order: {
          id: 1603155,
          date: '2018-11-28',
          invoiceNumber: '636039',
          sequenceNumber: 97027,
        },
        origin: {
          code: '10',
          description: 'Importeur',
        },
        standingDays: {
          dealer: 8,
          demo: 996,
          dealerDemo: 1004,
        },
        stateCode: '10',
        stockEnteringDate: '2019-03-18',
        stockLeavingDate: null,
        usageCode: '20',
        vehicleCode: {
          modelGenerationId: 379,
          typeId: 318,
          bodyId: 102,
          engineId: 297,
          fuelId: 54,
          transmissionId: 67,
          finishingId: 651,
          colorId: 4089,
          typecode: 61945,
          modelGenerationDescriptionShort: '19',
          colorDescriptionShort: 'GY2',
        },
        vin: 'JKBZXT02ADA004561',
        isDeclarable: true,
        claimsExists: true,
        hasPremiums: true,
        technicalAttributes: {
          isActive: true,
          createdBy: 'CH22078(FZ_SYSTEMDRUCK_M)',
          createdOn: '2019-03-14T13:03:20',
          updatedBy: 'INFO@MOTO-CENTER-WEST.CH',
          updatedOn: '2019-03-27T15:21:49',
          versionNo: 3,
        },
      },
    },
  ],
  links: {
    first:
      'https://portaltest.emilfrey.ch:443/_wsE122_dealer-vehicles-api/resources/stock-vehicles?page[limit]=1&filter[dealerId]=22597&filter[stateCode]=10',
    last: 'https://portaltest.emilfrey.ch:443/_wsE122_dealer-vehicles-api/resources/stock-vehicles?page[limit]=1&filter[dealerId]=22597&page[offset]=25&filter[stateCode]=10',
    next: 'https://portaltest.emilfrey.ch:443/_wsE122_dealer-vehicles-api/resources/stock-vehicles?page[limit]=1&filter[dealerId]=22597&page[offset]=1&filter[stateCode]=10',
  },
  meta: {
    totalResourceCount: 26,
  },
};
