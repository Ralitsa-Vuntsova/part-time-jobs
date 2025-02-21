export enum ApplicationResponse {
  Accepted = 'Accepted',
  Declined = 'Declined',
}

// TODO: Consider making the enum keys lowercase, so such maps can be deleted
export const applicationResponseToTranslateKey = {
  [ApplicationResponse.Accepted]: 'accepted',
  [ApplicationResponse.Declined]: 'declined',
};
