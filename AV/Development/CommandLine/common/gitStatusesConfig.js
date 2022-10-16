const STAGED_STATUSES = [
  {
    added: true,
    tracked: false,
  },
  { added: true, modified: true },
  { added: true, deleted: true },
];

const UNTRACKED_STATUSES = [{ added: false, tracked: false }];

const CHANGED_STATUSES = [
  { added: false, tracked: true, modified: true },
  { added: false, tracked: true, deleted: true },
];

const STAGEABLE_STATUSES = [...UNTRACKED_STATUSES, ...CHANGED_STATUSES];

export {
  STAGED_STATUSES,
  UNTRACKED_STATUSES,
  CHANGED_STATUSES,
  STAGEABLE_STATUSES,
};
