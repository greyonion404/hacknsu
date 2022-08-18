import {
    supabase
} from "./supabaseClient";


// users
// add user
async function addAuth0UserToDatabase(user) {

    let newUser = {
        userID: user.sub,
        auth0Info: user,
        name: user.nickname,
        specialType: null, // can be STUDENT
        isPremium: false,
    };
    const { data, error } = await supabase.from('users').insert([newUser]);
    return { data, error };
}

// retrieve user
async function getUserWithAuth0ID(auth0ID) {
    const { data, error } = await supabase.from('users').select('*').eq('userID', auth0ID);
    return { data, error };
}

export {
    addAuth0UserToDatabase,
    getUserWithAuth0ID,
}