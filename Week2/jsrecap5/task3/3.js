async function getUser() {
    try {
        const response = await fetch(`https://reqres.in/api/unknown`);
        const jsonData = await response.json();
        console.log(jsonData);
    } catch (error) {
        console.log(error.message);

    } finally {
        console.log('async load complete.')
    }
    
};

getUser();