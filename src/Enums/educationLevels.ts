enum Level {
    Bachelor = 1,
    Master = 2,
    Doctoral = 3,
    Associate = 4,
}

// Access role names with a map or separate object
export const levelNames = {
    [Level.Bachelor]: 'Bachelor',
    [Level.Master]: 'Master',
    [Level.Doctoral]: 'Doctoral',
    [Level.Associate]: 'Associate',
};