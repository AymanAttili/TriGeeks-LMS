enum Gender {
    Male = 1,
    Female = 2,
}

// Access role names with a map or separate object
export const genderNames = {
    [Gender.Male]: 'Male',
    [Gender.Female]: 'Female',
};

export const gender = [
    {value: 1, label: 'Male'},
    {value: 2, label: 'Female'},
]