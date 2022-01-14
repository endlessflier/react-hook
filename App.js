import React from 'react';

const initCustomerData = [
    {customer_id: 1, first_name: "Bob", last_name: "Smith", address: "87 Main St", address2: "Apt 87", city: "Los Angeles", state: "CA", zip_code: "17435"},
    {customer_id: 2, first_name: "Barb", last_name: "Belmont", address: "84 Palm", address2: null, city: "Petersburg", state: "AR", zip_code: "34625"},
    {customer_id: 3, first_name: "Jerry", last_name: "Seinfeld", address: "4876 22nd", address2: "4", city: "New York City", state: "NY", zip_code: "38756"},
    {customer_id: 4, first_name: "Yijun", last_name: "Li", address: "95 Cherry", address2: null, city: "Orlando", state: "FL", zip_code: "26564"},
    {customer_id: 5, first_name: "Corey", last_name: "Smith", address: "83573 Oregon Ave", address2: "Suite # 544", city: "Eagle Rock", state: "WA", zip_code: "97524"},
    {customer_id: 6, first_name: "Gloria", last_name: "Hernandez", address: "9 Pine Rd", address2: "2", city: "Sacramento", state: "CA", zip_code: "34655"}
];

const Customer = ({data}) => {

    return(
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
            <div style={{
                padding: '10px', margin: '10px',
                display: 'flex', flexDirection: 'column',
                boxShadow: '1px 1px 2px 1px rgba(0,0,0,0.1)',
                borderRadius: '5px', minWidth: '300px'
            }}>
                <b>Customer Address:</b>
                <div>{data.first_name} {data.last_name}</div>
                <div>{data.address}{data.address2 ? `, ${data.address2}` : ''}</div>
                <div>{data.city}, {data.state}, US {data.zip_code}</div>
                <button style={{margin: '10px', cursor: 'pointer'}}>Edit</button>
            </div>
        </div>
    );
};

const CustomerDirectory = () => {

    return(
        <div>
            <h1 style={{marginLeft: '10px'}}>Customers:</h1>
            <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                {initCustomerData.map(customer=><Customer key={customer.customer_id} data={customer}/>)}
            </div>
        </div>
    );
};

export default CustomerDirectory;
