export enum ApplicationResponse {
  Accepted = 'Accepted',
  Declined = 'Declined',
}

// TODO [future]: Consider just changing the enum keys to translate keys
export const applicationResponseToTranslateKey = {
  [ApplicationResponse.Accepted]: 'accepted',
  [ApplicationResponse.Declined]: 'declined',
};
