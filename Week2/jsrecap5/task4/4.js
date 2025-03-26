

async function fetchData(url, options) {
    try {
        const response = await fetch(`${url}`, options);
        if(!response.ok) throw new Error('Invalid input');
        const jsonData = await response.json();
        return jsonData;
    } catch (error) {
        console.log(error.message);

    }
};

async function testFunction() {
try {
    const user = {
       name: 'John Doe',
       job: 'Developer'
    };
    const url = 'https://reqresewfwef';

    const options = {
       method: 'GET',
       headers: {
          'Content-Type': 'application/json'
       },
      // body: JSON.stringify(user)
    }
    const userData = await fetchData(url, options);
    console.log(userData);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}
testFunction();