import { Checkbox, FormControlLabel, Grid2 as Grid } from "@mui/material"
import { useMajors } from "../../features/majors/useMajors"

function DepartmentMajorsCheckbox({ department, isChecked, check, disabled }) {
    const { majors, isLoading } = useMajors(department.id)
    const handleParentCheck = (e) => {
        const checked = e.target.checked;
        majors.map((major) => check(String(major.id), checked))
    }

    const handleSonCheck = (e) => {
        const checked = e.target.checked;
        const id = e.target.value
        check(id, checked)
    }

    return (
        <>
            {
                !isLoading &&
                <>
                    <FormControlLabel
                        label={department.name}
                        control={
                            <Checkbox
                                checked={majors.length > 0 && majors.reduce((has, major) => (has && isChecked(major.id)), true)}
                                indeterminate={majors.reduce((has, major) => (has || isChecked(major.id)), false) && !majors.reduce((has, major) => (has && isChecked(major.id)), true)}
                                onChange={handleParentCheck}
                                disabled={disabled}
                            />
                        }
                    />
                    <Grid container flexDirection={'column'} marginLeft={3}>
                        {
                            majors?.map((major) =>
                                <FormControlLabel
                                    label={major.name}
                                    control={<Checkbox
                                        value={major.id}
                                        checked={isChecked(major.id)}
                                        onChange={handleSonCheck}
                                        disabled={disabled}

                                    />}
                                />)
                        }
                    </Grid>
                </>
            }
        </>
    )
}

export default DepartmentMajorsCheckbox