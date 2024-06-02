import s from './App.module.css';
import MainMenu from "./components/MainMenu/MainMenu";
import Schedule from "./components/Schedule/Schedule";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import {useEffect, useState} from "react";
import Patients from "./components/Patients/Patients";
import Footer from "./components/Footer/Footer";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Account from "./components/Account/Account";
import {fetchPatients} from "./reducers/patientsSlice";
import {useDispatch, useSelector} from "react-redux";
import Doctors from "./components/Doctors/Doctors";

function App() {
    const [isFullMainMenuShown, setIsFullMainMenuShown] = useState(true);
    const [isAddPatientForm, setIsAddPatientForm] = useState(false);
    const [isAddReceptionForm, setIsAddReceptionForm] = useState(false);
    const [isReceptionInfo, setIsReceptionInfo] = useState(false);

    const account = useSelector(state => state.user);
    const status = account.account ? account.account.status : "";
    const [isRegistered, setIsRegistered] = useState(!!account);

    const [patientsSearchFilter, setPatientsSearchFilter] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPatients());
    }, [dispatch]);


    return (
        <BrowserRouter>
            <div className={isFullMainMenuShown ? s.fullApp : s.app}>
                <div className={s.menu}>
                    <MainMenu
                        isFullMainMenuShown={isFullMainMenuShown}
                        setIsFullMainMenuShown={setIsFullMainMenuShown}
                    />
                </div>
                <div className={s.mainContent}>
                    <Header
                        isRegistered={isRegistered}
                        patientsSearchFilter={patientsSearchFilter}
                        setPatientsSearchFilter={setPatientsSearchFilter}
                    />
                    <div className={s.content}>
                        <Routes>
                            {account.account &&
                                <Route path={"/patients"} element={
                                    <Patients
                                        patientsSearchFilter={patientsSearchFilter}
                                        setIsAddPatientForm={setIsAddPatientForm}
                                        setIsAddReceptionForm={setIsAddReceptionForm}
                                        setIsReceptionInfo={setIsReceptionInfo}
                                    />
                                }/>
                            }
                            <Route path={"/account"} element={
                                <Account
                                    isRegistered={isRegistered}
                                    setIsRegistered={setIsRegistered}
                                />
                            }/>
                            {account.account &&
                                <Route path={"/schedule"} element={
                                    <Schedule
                                        setIsAddReceptionFrom={setIsAddReceptionForm}
                                        setIsAddPatientForm={setIsAddPatientForm}
                                        setIsReceptionInfo={setIsReceptionInfo}
                                    />
                                }/>
                            }
                            {status === "administrator" &&
                                <Route path={"/doctors"} element={
                                    <Doctors/>
                                }/>
                            }
                        </Routes>
                        {(isAddPatientForm || isAddReceptionForm || isReceptionInfo) && <Sidebar
                            isAddPatientForm={isAddPatientForm}
                            isAddReceptionForm={isAddReceptionForm}
                            isReceptionInfo={isReceptionInfo}
                            setIsAddReceptionFrom={setIsAddReceptionForm}
                            setIsAddPatientForm={setIsAddPatientForm}
                            setIsReceptionInfo={setIsReceptionInfo}
                        />}
                    </div>
                    <Footer/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
