import { Fragment, useState, useMemo } from 'react';
import { JsonForms } from '@jsonforms/react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import logo from './logo.svg';
import './App.css';
import schema from './schema.json';
import uischema from './uischema.json';
import {
    materialCells,
    materialRenderers,
} from '@jsonforms/material-renderers';
import RatingControl from './RatingControl';
import ratingControlTester from './ratingControlTester';
import { makeStyles } from '@mui/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const useStyles = makeStyles({
    container: {
        padding: '1em',
        width: '100%',
    },
    title: {
        textAlign: 'center',
        padding: '0.25em',
    },
    dataContent: {
        display: 'flex',
        justifyContent: 'center',
        borderRadius: '0.25em',
        backgroundColor: '#cecece',
        marginBottom: '1rem',
    },
    resetButton: {
        margin: 'auto !important',
        display: 'block !important',
    },
    demoform: {
        margin: 'auto',
        padding: '1rem',
    },
});

const initialData = {};

const renderers = [
    ...materialRenderers,
    //register custom renderers
    { tester: ratingControlTester, renderer: RatingControl },
];

const App = () => {
    const classes = useStyles();
    const [data, setData] = useState<any>(initialData);
    const [report, setReport] = useState<any>('');
    const stringifiedData = useMemo(
        () => JSON.stringify(data, null, 2),
        [data]
    );

    const clearData = () => {
        setData({});
    };

    const handleChange = (event: SelectChangeEvent) => {
        setReport(event.target.value as string);
    };

    return (
        <Fragment>
            <div className='App'>
                <header className='App-header'>
                    <img src={logo} className='App-logo' alt='logo' />
                </header>
            </div>

            <Grid
                container
                justifyContent={'center'}
                spacing={1}
                className={classes.container}
            >
                <Grid item sm={6}>
                    <Typography variant={'h4'} className={classes.title}>
                        Bound data
                    </Typography>
                    <div className={classes.dataContent}>
                        <pre id='boundData'>{stringifiedData}</pre>
                    </div>
                    <Button
                        className={classes.resetButton}
                        onClick={clearData}
                        color='primary'
                        variant='contained'
                    >
                        Clear data
                    </Button>
                </Grid>
                <Grid item sm={6}>
                    <Typography variant={'h4'} className={classes.title}>
                        Rendered form
                    </Typography>
                    <div className={classes.demoform}>
                        {/* <InputLabel id='demo-simple-select-label'>
                            Report Type
                        </InputLabel>
                        <Select
                            labelId='demo-simple-select-label'
                            id='demo-simple-select'
                            value={report}
                            label='Please select'
                            onChange={handleChange}
                        >
                            <MenuItem value='none' disabled>
                                Please Select
                            </MenuItem>
                            <MenuItem value='Agency Conversion Report'>
                                Agency Conversion Report
                            </MenuItem>
                            <MenuItem value='Agency Loss Run Report'>
                                Agency Loss Run Report
                            </MenuItem>
                            <MenuItem value='Agency Profile Report'>
                                Agency Profile Report
                            </MenuItem>
                            <MenuItem value='Inforce Policy Report'>
                                Inforce Policy Report
                            </MenuItem>
                            <MenuItem value='Payment Report'>
                                Payment Report
                            </MenuItem>
                            <MenuItem value='Policy Loss Run Report'>
                                Policy Loss Run Report
                            </MenuItem>
                            <MenuItem value='Renewal Report'>
                                Renewal Report
                            </MenuItem>
                        </Select>
                        <h2>{report}</h2> */}

                        <JsonForms
                            schema={schema}
                            uischema={uischema}
                            data={data}
                            renderers={renderers}
                            cells={materialCells}
                            onChange={({ errors, data }) => setData(data)}
                        />

                        <ButtonGroup
                            variant='contained'
                            aria-label='outlined primary button group'
                        >
                            <Button
                                className={classes.resetButton}
                                color='primary'
                                variant='contained'
                            >
                                Export To Excel
                            </Button>

                            <Button
                                className={classes.resetButton}
                                color='primary'
                                variant='contained'
                            >
                                Generate Report
                            </Button>
                        </ButtonGroup>
                    </div>
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default App;
