// useFirebaseData.js
import { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import app from "../Firebase/firebase";

const useFirebaseData = () => {
    const [flag, setFlag] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const db = getDatabase(app);
            const dbRef = ref(db, "flag");

            onValue(dbRef, (snapshot) => {
                const firebaseData = snapshot.val();
                if (firebaseData !== null) {
                    const flagValue = firebaseData;
                    setFlag(flagValue);
                    if (flagValue) {
                        const companiesRef = ref(db, "companies");
                        onValue(companiesRef, (companiesSnapshot) => {
                            const companiesData = companiesSnapshot.val();
                            if (companiesData !== null) {
                                const companiesArray = Object.values(companiesData);
                                setData(companiesArray);
                            }
                        });
                    }
                }
            });
        };

        fetchData();
    }, []);

    return { flag, data };
};

export default useFirebaseData;
