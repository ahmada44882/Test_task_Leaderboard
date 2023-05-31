import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import { usersList } from './Data';

const App = () => {
  const [searchedText, setSearchedText] = useState('')
  const [filteredList, setFilteredList] = useState([])

  const userRank = useRef(-1)

  const handleSearch = async () => {
    let usersListTemp = [...usersList]
    usersListTemp.sort((a, b) => b.bananas - a.bananas)

    let foundedUser = null

    for (let i = 0; i < usersListTemp.length; i++) {
      const user = usersListTemp[i]
      if (user.name.toLowerCase() === searchedText.toLowerCase()) {
        foundedUser = user
        userRank.current = i
        break;
      }
    }


    const topTenUsers = usersListTemp.slice(0, 10) 
    if(foundedUser === null){
      alert("This user name does not exist! Please specify an existing user name!")
    }
    else if (userRank.current < 10) {
      setFilteredList(topTenUsers)
    } else if (foundedUser != null) {
      setFilteredList([...topTenUsers.slice(0, 9), foundedUser])
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ fontSize: 18, fontWeight: 600, color: "white" }}>Home</Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Image
            style={styles.icon}
            source={{ uri: 'https://img.icons8.com/?size=512&id=111487&format=png' }}
            resizeMode='cover'
          />
          <TextInput
            style={styles.input}
            placeholder='User Name'
            onChangeText={(text) => { setSearchedText(text) }}
          />

        </View>

        <TouchableOpacity style={styles.button} onPress={() => handleSearch()}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.top}>
        <Text style={{ fontSize: 14, color: 'white', width: "40%", paddingLeft: 10 }}>Name</Text>
        <Text style={{ fontSize: 14, fontWeight: 500, color: 'white', width: '14%' }}>Rank</Text>
        <Text style={{ fontSize: 14, fontWeight: 500, color: 'white', width: "23%" }}>#Bananas</Text>
        <Text style={{ fontSize: 14, fontWeight: 500, color: 'white', width: "23%" }}>Searched?</Text>
      </View>
      <View style={styles.table}>
        <FlatList
          data={filteredList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            const isSearched = item.name === searchedText

            return (
              <View key={index} style={styles.list}>
                <Text style={{ color: isSearched ? "red" : 'black', fontSize: 12, width: '40%' }}>{item?.name}</Text>
                <Text style={{ color: 'black', fontSize: 12, width: '14%', textAlign: "center" }}>{(isSearched ? userRank.current : index) + 1}</Text>
                <Text style={{ color: 'black', fontSize: 12, width: "23%", textAlign: "center" }}>{item?.bananas}</Text>
                <Text style={{ color: isSearched ? "red" : 'black', fontSize: 12, width: "23%", textAlign: "center" }}>{isSearched ? 'Yes' : "No"}</Text>
              </View>
            )
          }}
          ListEmptyComponent={() => {
            return (
              <Text style={{ color: "black", alignSelf: 'center', marginTop: "20%" }}>{"No Search "}</Text>
            )
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    margin: 10,
    marginTop: 20
  },
  inputWrapper: {
    flex: 1,
    marginRight: 5,
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    borderColor: '#aaa'
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  input: {
    flex: 1,
  },
  button: {
    flex: 0.5,
    marginLeft: 5,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#009688",
    borderColor: '#ccc'
  },
  buttonText: {
    color: 'white',
    fontWeight: 500
  },
  header: {
    height: 60,
    backgroundColor: "#009688",
    alignItems: "center",
    justifyContent: 'center'
  },
  table: {
    height: 500,
    marginHorizontal: 20,

  },
  top: {
    flexDirection: "row",
    margin: 20,
    height: 80,
    borderRadius: 5,
    borderWidth: 1,
    alignItems: "center",
    borderColor: "#aaa",
    backgroundColor: "#009688"
  },
  list: {
    flexDirection: "row",
    marginBottom: 20,
    borderBottomWidth: 0.5,
    paddingBottom: 5
  }

});

export default App;
