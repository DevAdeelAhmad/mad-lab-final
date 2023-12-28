import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Details = ({ route }) => {
    const { company } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.companyName}>{company.Name}</Text>
            <Text style={styles.boldText}>Rating: <Text style={styles.detailText}>{company.Rating}</Text></Text>
            <Text style={styles.boldText}>Reviews: <Text style={styles.detailText}>{company.Reviews}</Text></Text>
            <Text style={styles.boldText}>Jobs: <Text style={styles.detailText}>{company.Jobs}</Text></Text>
            <Text style={styles.boldText}>Salary Reviews: <Text style={styles.detailText}>{company.Salary_reviews}</Text></Text>
            <Text style={styles.boldText}>Highly Rated: <Text style={styles.detailText}>{company.Highly_rated}</Text></Text>
            <Text style={styles.boldText}>Poorly Rated: <Text style={styles.detailText}>{company.Poorly_rated}</Text></Text>
            <Text style={styles.boldText}>Details: <Text style={styles.detailText}>{company.Details}</Text></Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: "10%",
        paddingTop: "10%"
    },
    companyName: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 10,
    },
    boldText: {
        fontSize: 20,
        marginBottom: 10,
        fontWeight: "bold"
    },
    detailText: {
        fontSize: 20,
        marginBottom: 10,
        fontWeight: "400"
    }
});

export default Details;
