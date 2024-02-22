import { render, screen, fireEvent, waitFor, queryAllByText } from "@testing-library/react";
import React from "react";
import { mockUser, mockToken } from '../tests/MockData';
import UserContext from "./UserContext";

import { MemoryRouter, Routes, Route } from "react-router";
import UserPage from "./UserPage";
jest.mock('./Api')

const setUserMock = ()=>{
    console.log('Mock setUser function');
}

test('User page rendering', async ()=>{
    const {getByText} = render(
        <UserContext.Provider value={{user : mockUser, token : mockToken, setUser : setUserMock}}>
            <MemoryRouter initialEntries={['/users/1']}>
                <UserPage/>
            </MemoryRouter>
        </UserContext.Provider>
    )
    expect(getByText('Loading Characters...')).toBeInTheDocument();
    await waitFor(()=>{
        expect(getByText('testuser')).toBeInTheDocument();
        expect(getByText('Test')).toBeInTheDocument();
        expect(getByText('Level 1 Test Test')).toBeInTheDocument();
    })

})