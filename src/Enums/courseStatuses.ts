enum Status {
    NotStarted = 1,
    InProgress = 2,
    Finished = 3,
    Failed = 4,
    Expired = 5,
}

export const courseStatuses = {
    [Status.NotStarted]: 'NotStarted',
    [Status.InProgress]: 'InProgress',
    [Status.Finished]: 'Finished',
    [Status.Failed]: 'Failed',
    [Status.Expired]: 'Expired',
};

export const statuses = [
    {value: 1, label: 'NotStarted'},
    {value: 2, label: 'InProgress'},
    {value: 3, label: 'Finished'},
    {value: 4, label: 'Failed'},
    {value: 5, label: 'Expired'}
]