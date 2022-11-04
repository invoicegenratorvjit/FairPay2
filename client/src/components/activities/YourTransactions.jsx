
import {Grid, Box, styled, Typography, autocompleteClasses, Popover, MenuList, MenuItem, ListItemIcon, ListItemText, Modal, Stack, Button } from '@mui/material'
import { useState } from 'react'
import { useEffect } from 'react'
import { getRecentUserExpService } from '../../services/expenseServices'
import AlertBanner from '../AlertBanner'
import ExpenseCard from '../expense/expenseCard'
import Loading from '../loading'
import { convertToCurrency, currencyFind, getMonthMMM } from '../../utils/helper';

export const YourTransactions = () => {
    const [loading, setLoading] = useState( true )
    const [alert, setAlert] = useState( false )
    const [alertMessage, setAlertMessage] = useState()
    const [recentExp, setRecentExp] = useState()
    const profile = JSON.parse( localStorage.getItem( 'profile' ) )
    useEffect( () => {
        const getRecentExp = async () => {
            setLoading( true )
            const userIdJson = {
                user: profile.phone
            }
            const recent_exp = await getRecentUserExpService( userIdJson, setAlert, setAlertMessage )
            console.log( "transactions", recent_exp )
            recent_exp && setRecentExp( recent_exp?.data?.expense )
            setLoading( false )

        }
        getRecentExp()


    }, [] )

    return (
        <>
            {loading ? <Loading /> :
                <Box sx={{
                    boxShadow: 5,
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                }}>
                    <AlertBanner showAlert={alert} alertMessage={alertMessage} severity='error' />
                    <Typography variant="h6" p={2} >
                        Notifications,
                    </Typography>
                    {recentExp?.map( myExpense => (
                        <>
                            <Grid container
                                alignItems="center"
                                justifyContent="space-between"
                                sx={{
                                    boxShadow: 5,
                                    borderRadius: 1,
                                    pl: 1,
                                    py: 1
                                }}
                            >
                            
                                <Grid item xs={5} ml={12}>
                                    <Typography noWrap variant='h6'
                                        color={( theme ) => theme.palette['primary'].dark}
                                    >
                                        {myExpense?.expenseName}
                                    </Typography>
                                    <Typography variant='body2'
                                        color={( theme ) => theme.palette['primary'].dark}
                                        sx={{
                                            fontSize: 12
                                        }}
                                    >
                                        {}
                                      {  myExpense?.expenseOwner } had paid {currencyFind( myExpense?.currencyType )} {convertToCurrency( myExpense?.expenseAmount )} for   {myExpense?.expenseName} 
                                    </Typography>
                                 

                                </Grid>
                                
                                {/* <Grid item xs={1}>
                                    <Box sx={{
                                        p: 0,
                                        mt: -5
                                    }}>
                                        <Iconify aria-describedby={id} icon="charm:menu-meatball" onClick={handleClick} />
                                        <Popover
                                            id={id}
                                            open={open}
                                            anchorEl={anchorEl}
                                            onClose={handleClose}
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'left',
                                            }}
                                        >
                                            <MenuList>
                                                <MenuItem component={RouterLink}
                                                    to={dataConfig.VIEW_EXPENSE_URL + expenseId}>
                                                    <ListItemIcon>
                                                        <Iconify icon="carbon:view-filled" />
                                                    </ListItemIcon>
                                                    <ListItemText>View</ListItemText>
                                                </MenuItem>
                                                <MenuItem component={RouterLink}
                                                    to={dataConfig.EDIT_EXPENSE_URL + expenseId}>
                                                    <ListItemIcon>
                                                        <Iconify icon="dashicons:edit-large" />
                                                    </ListItemIcon>
                                                    <ListItemText>Edit</ListItemText>
                                                </MenuItem>
                                                <MenuItem onClick={deleteConfirmOpen} sx={{ color: ( theme ) => theme.palette['error'].main }}>
                                                    <ListItemIcon>
                                                        <Iconify sx={{ color: ( theme ) => theme.palette['error'].main }} icon="fluent:delete-20-filled" />
                                                    </ListItemIcon>
                                                    <ListItemText>Delete</ListItemText>
                                                </MenuItem>
                                            </MenuList>
                                        </Popover>
                                        <Modal
                                            open={deleteConfirm}
                                            onClose={deleteConfirmClose}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                        >
                                            <Box sx={modelStyle} width={mdUp ? 400 : '90%'}>
                                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                                    Confirm expense deletion
                                                </Typography>
                                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                                    Are you sure you want to delete the expense?
                                                </Typography>
                                                <Stack mt={2} spacing={2} direction={'row'}>
                                                    <Button startIcon={<Iconify icon='fluent:delete-dismiss-24-filled' />} variant="outlined" color="error" sx={{ width: '100%' }}
                                                        onClick={apiDeleteCall}
                                                    >
                                                        Delete
                                                    </Button>
                                                    <Button startIcon={<Iconify icon='material-symbols:cancel' />} variant="outlined" color="primary" sx={{ width: '100%' }}
                                                        onClick={deleteConfirmClose}
                                                    >
                                                        Cancel
                                                    </Button>
                                                </Stack>
                                            </Box>
                                        </Modal>
                                    </Box>
                                </Grid> */}
                            </Grid>
                           
                        </>
                    ) )}
                </Box>}
        </>
    )
}
