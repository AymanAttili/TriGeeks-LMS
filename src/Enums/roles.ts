enum Role {
    Admin = 1,
    SubAdmin = 2,
    Staff = 3
}

// Access role names with a map or separate object
export const roleNames = {
    [Role.Admin]: 'Admin',
    [Role.SubAdmin]: 'SubAdmin',
    [Role.Staff]: 'Staff'
};

export const roles = [
    {value: 2, label: 'SubAdmin'},
    {value: 3, label: 'Staff'},
]