export enum ArchiveReason {
  Unpublishing = 'Unpublishing',
  Done = 'Done',
}

export const archieveReasonToTranslateKey = {
  [ArchiveReason.Unpublishing]: 'archieve-unpublish-reason',
  [ArchiveReason.Done]: 'archieve-done-reason',
};
