import {  Container, Grid } from "@mui/material"
import { useEffect, useState } from "react"
import { getUserExpenseService} from "../../services/expenseServices"
import { getUserGroupsService } from "../../services/groupServices"
import Loading from "../loading"

import { YourTransactions } from "./YourTransactions"



export default function Activity() {
    const [loading, setLoading] = useState(true)
    const profile = JSON.parse(localStorage.getItem("profile"))
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [userExp, setUserExp] = useState()
    const [newUser, setNewUser] = useState(false)

    useEffect(() => {
        const getUserDetails = async () => {
            setLoading(true);
            const userIdJson = {
                user: profile.phone
            }
            const response_expense = await getUserExpenseService(userIdJson, setAlert, setAlertMessage)
            console.log("response_expense ",response_expense )
            setUserExp(response_expense.data);
            const response_group = await getUserGroupsService(profile)
            if (response_group.data.groups.length == 0)
                setNewUser(true)
            setLoading(false)

        }
        getUserDetails();


    }, [])

    return (
        <Container maxWidth={'xl'}>
            {loading ? <Loading /> :
                <Grid container spacing={3}>
                    
                    {!newUser &&
                        <Grid item xs={12} md={12}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <YourTransactions />
                                </Grid>
                            </Grid>
                        </Grid>
                    }

                </Grid>

            }</Container>

    )
}
