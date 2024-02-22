import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { mockUser, mockToken } from '../tests/MockData'
import UserContext from "./UserContext";
import { createMemoryHistory } from "history";
import { Router } from "react-router";
import UserPage from "./UserPage";
jest.mock('./Api')

const setUser = ()=>{
    console.log('Mock setUser function');
}

test('test',()=>{
    expect(1).toEqual(1);
})

test('User page rendering', async ()=>{
    const history = createMemoryHistory();
    history.push('/users/1');
    render(
        <UserContext.Provider value={{mockUser, mockToken, setUser}}>
            <Router history={history}>
                <UserPage/>
            </Router>
        </UserContext.Provider>
    )
})