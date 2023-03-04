import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';


import { supabase } from '@/lib/supabaseClient';
import { useFormik } from 'formik';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export default function TransactionForm({categories, accounts}) {
    const formik = useFormik({
        initialValues: {
            item: '',
            amount: '',
            category: '',
            account: '',
            transaction_date_time: dayjs('2022-04-07'),
            label: '',
            notes: ''
        },
        onSubmit: values => {
            createTransaction(values);
        }
    })

    async function createTransaction(transactionDetails) {
        const { data, error } = await supabase
            .from('transaction')
            .insert(transactionDetails)
        if (data) {
            alert('transaction created successfully')
        }
        if (error) {
            alert(error.message)
        }
        
    }
    return (
        <form method='POST' onSubmit={formik.handleSubmit}>
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography variant="h6" gutterBottom>
                        Transaction Details
                    </Typography>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="item"
                                name="item"
                                label="Payee / Item"
                                fullWidth
                                autoComplete="given-name"
                                variant="standard"
                                onChange={formik.handleChange}
                                value={formik.values.item}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="amount"
                                name="amount"
                                label="Amount"
                                fullWidth
                                autoComplete="family-name"
                                variant="standard"
                                type='number'
                                onChange={formik.handleChange}
                                value={formik.values.amount}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl sx={{minWidth: 120 }} fullWidth>
                                <InputLabel htmlFor="category">Category</InputLabel>
                                <Select 
                                    defaultValue=""
                                    id="category"
                                    name="category"
                                    label="Category"
                                    onChange={formik.handleChange}
                                    value={formik.values.category}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {categories.map(category => {
                                        return (
                                            <MenuItem value={category.id} key={category.id}>{category.name}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl sx={{minWidth: 120 }} fullWidth>
                                <InputLabel htmlFor="account">Account</InputLabel>
                                <Select
                                    defaultValue=""
                                    id="account"
                                    name="account"
                                    label="Account"
                                    onChange={formik.handleChange}
                                    value={formik.values.account}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {accounts.map(account => {
                                        return (
                                            <MenuItem value={account.id} key={account.id}>{account.name}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    renderInput={(props) => <TextField name='transaction_date_time' {...props} />}
                                    id='transaction_date_time'
                                    label="DateTimePicker"
                                    value={formik.values.transaction_date_time}
                                    onChange={formik.handleChange}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="label"
                                name="label"
                                label="Label"
                                fullWidth
                                variant="standard"
                                onChange={formik.handleChange}
                                value={formik.values.label}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="notes"
                                name="notes"
                                label="Notes"
                                fullWidth
                                variant="standard"
                                onChange={formik.handleChange}
                                value={formik.values.notes}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button variant="contained" type='submit'>Create Transaction</Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </form>
    );
}

export async function getServerSideProps() {
    const { data: categories } = await supabase.from('category').select();
    const { data: accounts } = await supabase.from('account').select();

    return {
        props: {
            categories: categories,
            accounts: accounts
        }
    }
}