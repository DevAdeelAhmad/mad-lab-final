import React, { useState, useMemo } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, TextInput, Button } from "react-native";
import { Table, Row, Rows } from 'react-native-table-component';
import useFirebaseData from "../hooks/useFlag";
import { useNavigation } from "@react-navigation/native";
import companiesData from "../assets/companies.json";

const Home = () => {
    const navigation = useNavigation();
    const { flag } = useFirebaseData();

    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState({ rating: false, reviews: false, highSalary: false });

    const renderTableView = (filteredData) => {
        const tableHead = ["Name", "Rating", "Reviews", "Jobs", "Salary Reviews"];

        const handleRowPress = (index) => {
            navigation.navigate("Company's Details", { company: filteredData[index] });
        };

        return (
            <Table style={styles.tableContainer}>
                <Row data={tableHead} style={styles.head} textStyle={styles.text} />
                <Rows
                    data={filteredData.map(company => [
                        company.Name,
                        company.Rating.toString(),
                        company.Reviews,
                        company.Jobs.toString(),
                        company.Salary_reviews,
                    ])}
                    textStyle={styles.text}
                    onPress={(rowIndex) => handleRowPress(rowIndex - 1)}
                />
            </Table>
        );
    };

    const renderFlatListView = (filteredData) => {
        const handleFlatListItemPress = (item) => {
            navigation.navigate("Company's Details", { company: item });
        };

        return (
            <FlatList
                style={styles.flatListContainer}
                data={filteredData}
                keyExtractor={(item) => item.Name}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.flatListItem}
                        onPress={() => handleFlatListItemPress(item)}
                    >
                        <Text style={styles.flatListItemText}>
                            <Text style={{ fontWeight: 'bold', fontStyle: 'italic' }}>{item.Name}</Text>
                            {"\nRating: "}{item.Rating}{"\nReviews: "}{item.Reviews}{"\nJobs: "}{item.Jobs}
                        </Text>
                    </TouchableOpacity>
                )}
            />
        );
    };

    const applyFilters = (data) => {
        return data.filter(company => {
            const meetsRatingFilter = filters.rating ? company.Rating >= 4 : true;
            const meetsReviewsFilter = filters.reviews ? parseFloat(company.Jobs) >= 500 : true;
            const meetsHighSalaryFilter = filters.highSalary ? parseFloat(company.Salary_reviews.replace('k', '000')) >= 80000 : true;
            const meetsSearchFilter = company.Name.toLowerCase().includes(search.toLowerCase());

            return meetsRatingFilter && meetsReviewsFilter && meetsHighSalaryFilter && meetsSearchFilter;
        });
    };


    const filteredData = useMemo(() => applyFilters(companiesData), [search, filters]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search by company name"
                    onChangeText={(text) => setSearch(text)}
                    value={search}
                />
            </View>
            <View style={styles.filterContainer}>
                <Button title="Rating 4+" onPress={() => setFilters(prevFilters => ({ ...prevFilters, rating: !prevFilters.rating }))} color={filters.rating ? "#45ff45" : "gray"} />
                <Button title="Jobs 500+" onPress={() => setFilters(prevFilters => ({ ...prevFilters, reviews: !prevFilters.reviews }))} color={filters.reviews ? "#45ff45" : "gray"} />
                <Button title="High Salary" onPress={() => setFilters(prevFilters => ({ ...prevFilters, highSalary: !prevFilters.highSalary }))} color={filters.highSalary ? "#45ff45" : "gray"} />
            </View>
            {flag ? renderTableView(filteredData) : renderFlatListView(filteredData)}
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    head: { height: 40, backgroundColor: '#f1f8ff', fontWeight: 'bold' },
    text: { margin: 6 },
    tableContainer: { flex: 1, width: '100%' },
    flatListContainer: {
        flex: 1,
        width: '80%',
        marginHorizontal: '10%',
    },
    flatListItem: {
        padding: 10,
        borderWidth: 1,
        borderBottomColor: '#ccc',
        borderRadius: 23,
        marginBottom: 10,
    },
    flatListItemText: {
        fontSize: 16,
    },
    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginBottom: 10,
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        marginBottom: 10,
        gap: 10
    },
    searchInput: {
        flex: 1,
        marginRight: 10,
        padding: 8,
        borderWidth: 1,
        borderRadius: 8,
    },
    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginBottom: 10,
    },
    searchInput: {
        flex: 1,
        marginRight: 10,
        padding: 8,
        borderWidth: 1,
        borderRadius: 8,
    },
});

export default Home;
