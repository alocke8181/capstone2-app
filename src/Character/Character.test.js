import { render, waitFor, fireEvent } from "@testing-library/react";
import React from "react";
import { mockUser, mockToken } from '../../tests/MockData'
import UserContext from "../UserContext";

import { MemoryRouter } from "react-router";
import CharacterTest from "./CharacterTest";
jest.mock('../Api');

const setUserMock = ()=>{
    console.log('Mock setUser function');
}

test('Character page rendering', async ()=>{
    const {getByText, getByDisplayValue, getByLabelText,getAllByRole} = render(
        <UserContext.Provider value={{user : mockUser, token : mockToken, setUser : setUserMock}}>
            <MemoryRouter initialEntries={['/characters/1']}>
                <CharacterTest/>
            </MemoryRouter>
        </UserContext.Provider>
    )
    expect(getByText('Loading Character...')).toBeInTheDocument();
    await waitFor(()=>{
        //Basic checks
        expect(getByDisplayValue('Mock Character')).toBeInTheDocument();
        expect(getByText('Human')).toBeInTheDocument();
        expect(getByText('Wizard')).toBeInTheDocument();
        //Core stat checks
        expect(getByLabelText('Strength').value).toEqual('9');
        //Saving Throw and Skill checks
        expect(getAllByRole('checkbox', {value : 'intelligence', checked : true})[0]).toBeInTheDocument();
        expect(getAllByRole('checkbox', {value : 'wisdom', checked : true})[0]).toBeInTheDocument();
        expect(getAllByRole('checkbox', {value : 'strength', checked : false})[0]).toBeInTheDocument();
        expect(getAllByRole('checkbox', {value : 'arcana', checked : true})[0]).toBeInTheDocument();
        expect(getAllByRole('checkbox', {value : 'athletics', checked : false})[0]).toBeInTheDocument();
        //Language & Equip Prof checks
        expect(getByText('test language')).toBeInTheDocument();
        expect(getByText('test equip prof')).toBeInTheDocument();
        //Alt resources and equipment
        expect(getByText('test resource')).toBeInTheDocument();
        expect(getByText('test equipment')).toBeInTheDocument();
        expect(getByLabelText('Copper :').value).toEqual('50');
        //Attacks, traits, features, and spells
        expect(getByText('Test Trait')).toBeInTheDocument();
        expect(getByText('Test Feature')).toBeInTheDocument();
        expect(getByText('Atk 1')).toBeInTheDocument();
        expect(getByText('Fire Bolt')).toBeInTheDocument();
        expect(getByText('Charm Person')).toBeInTheDocument();

    })
})

test('Updating and saving character works', async ()=>{
    const {getByText, getByLabelText} = render(
        <UserContext.Provider value={{user : mockUser, token : mockToken, setUser : setUserMock}}>
            <MemoryRouter initialEntries={['/characters/1']}>
                <CharacterTest/>
            </MemoryRouter>
        </UserContext.Provider>
    )
    await waitFor(()=>{
        let strStat = getByLabelText('Strength');
        expect(strStat.value).toEqual('9');
        fireEvent.change(strStat, {target: {value: '10'}})
        expect(getByLabelText('Strength').value).toEqual('10');
        expect(getByText('Save Character')).toBeInTheDocument();
        fireEvent.click(getByText('Save Character'));
        expect(getByLabelText('Strength').value).toEqual('10');
    })
})