import React, { useState, useMemo, useCallback, useEffect } from "react";
import "./App.css";

const emptyCustomerData = {
  first_name: "",
  last_name: "",
  address: "",
  address2: "",
  city: "",
  state: "",
  zip_code: "",
};

const initCustomerData = [
  {
    customer_id: 1,
    first_name: "Bob",
    last_name: "Smith",
    address: "87 Main St",
    address2: "Apt 87",
    city: "Los Angeles",
    state: "CA",
    zip_code: "17435",
  },
  {
    customer_id: 2,
    first_name: "Barb",
    last_name: "Belmont",
    address: "84 Palm",
    address2: null,
    city: "Petersburg",
    state: "AR",
    zip_code: "34625",
  },
  {
    customer_id: 3,
    first_name: "Jerry",
    last_name: "Seinfeld",
    address: "4876 22nd",
    address2: "4",
    city: "New York City",
    state: "NY",
    zip_code: "38756",
  },
  {
    customer_id: 4,
    first_name: "Yijun",
    last_name: "Li",
    address: "95 Cherry",
    address2: null,
    city: "Orlando",
    state: "FL",
    zip_code: "26564",
  },
  {
    customer_id: 5,
    first_name: "Corey",
    last_name: "Smith",
    address: "83573 Oregon Ave",
    address2: "Suite # 544",
    city: "Eagle Rock",
    state: "WA",
    zip_code: "97524",
  },
  {
    customer_id: 6,
    first_name: "Gloria",
    last_name: "Hernandez",
    address: "9 Pine Rd",
    address2: "2",
    city: "Sacramento",
    state: "CA",
    zip_code: "34655",
  },
];

const stateOptions = ["CA", "AR", "NY", "FL", "WA"];

const constants = {
  customers_data: "customers_data",
};

const Customer = ({ data, onEdit, onDelete }) => {
  const handleEdit = useCallback(() => {
    onEdit(data);
  }, [data, onEdit]);

  const handleDelete = useCallback(() => {
    onDelete(data);
  }, [data, onDelete]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          padding: "10px",
          margin: "10px",
          display: "flex",
          flexDirection: "column",
          boxShadow: "1px 1px 2px 1px rgba(0,0,0,0.1)",
          borderRadius: "5px",
          minWidth: "300px",
        }}
      >
        <b>Customer Address:</b>
        <div>
          {data.first_name} {data.last_name}
        </div>
        <div>
          {data.address}
          {data.address2 ? `, ${data.address2}` : ""}
        </div>
        <div>
          {data.city}, {data.state}, US {data.zip_code}
        </div>
        <button className="button" onClick={handleEdit}>
          Edit
        </button>
        <button className="button" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

const ErrorValidationLabel = ({ txtLbl }) => (
  <label htmlFor="" style={{ color: "red" }}>
    {txtLbl}
  </label>
);

const EditCustomerDialog = ({ customerInfo, onSave, onExit }) => {
  const defaultFormState = useMemo(
    () => ({
      first_name: "",
      last_name: "",
      address: "",
      address2: "",
      city: "",
      state: "",
      zip_code: "",
    }),
    []
  );

  const defaultErrorState = useMemo(
    () => ({
      first_name: {
        error: null,
        required: true,
        requiredText: "First name is required",
      },
      last_name: {
        error: null,
        required: true,
        requiredText: "Last name is required",
      },
      address: {
        error: null,
        required: true,
        requiredText: "Address is required",
      },
      address2: {
        error: null,
        required: false,
      },
      city: {
        error: null,
        required: true,
        requiredText: "City is required",
      },
      state: {
        error: null,
        required: true,
        requiredText: "State is required",
      },
      zip_code: {
        error: null,
        required: true,
        requiredText: "Zip Code is required",
      },
      is_form_valid: false,
    }),
    []
  );

  const [customerFormData, setCustomerFormData] = useState({
    ...defaultFormState,
  });
  const [formErrors, setFormErrors] = useState(defaultErrorState);

  const handleFormChange = (event) => {
    setCustomerFormData((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };

  const handleChangeState = (event) => {
    setCustomerFormData((state) => ({
      ...state,
      state: event.target.value,
    }));
  };

  useEffect(() => {
    setCustomerFormData({
      ...customerInfo,
    });
  }, [customerInfo]);

  const handleSubmit = (event) => {
    event.preventDefault();
    let is_form_valid = true;
    const updatedErrorsState = Object.keys(defaultErrorState).reduce(
      (result, fieldName) => {
        if (fieldName !== "is_form_valid") {
          const error =
            formErrors[fieldName].required &&
            !customerFormData[fieldName].trim().length
              ? true
              : false;
          if (error) {
            is_form_valid = false;
          }

          result[fieldName] = {
            ...formErrors[fieldName],
            error,
          };
        }
        return result;
      },
      {}
    );
    updatedErrorsState.is_form_valid = is_form_valid;
    setFormErrors({
      ...updatedErrorsState,
    });

    if (!is_form_valid) {
      return false;
    }
    onSave(customerFormData);
  };

  const handleClose = () => {
    onExit();
    setCustomerFormData({
      ...defaultFormState,
    });
    setFormErrors({
      ...defaultErrorState,
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        flexWrap: "wrap",
        position: "fixed",
        top: "0",
        left: "0",
        bottom: "0",
        right: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "15px",
          maxWidth: "600px",
          width: "100%",
          position: "relative",
        }}
      >
        <button
          type="button"
          onClick={handleClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "22px",
            fontSize: "22px",
            cursor: "pointer",
            border: "0",
            backgroundColor: "transparent",
          }}
        >
          x
        </button>
        <form onSubmit={handleSubmit} noValidate>
          <div style={{ marginBottom: "10px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              First Name
            </label>
            <input
              style={{
                maxWidth: "100%",
                width: "100%",
                padding: "10px",
                boxSizing: "border-box",
                border: "1px solid #e1e1e1",
              }}
              name="first_name"
              type="text"
              onChange={handleFormChange}
              required
              value={customerFormData.first_name}
            />
            {formErrors.first_name.error ? (
              <ErrorValidationLabel
                txtLbl={formErrors.first_name.requiredText}
              />
            ) : (
              ""
            )}
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Last Name
            </label>
            <input
              style={{
                maxWidth: "100%",
                width: "100%",
                padding: "10px",
                boxSizing: "border-box",
                border: "1px solid #e1e1e1",
              }}
              name="last_name"
              onChange={handleFormChange}
              type="text"
              required
              value={customerFormData.last_name}
            />
            {formErrors.last_name.error ? (
              <ErrorValidationLabel
                txtLbl={formErrors.last_name.requiredText}
              />
            ) : (
              ""
            )}
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Address
            </label>
            <textarea
              style={{
                maxWidth: "100%",
                width: "100%",
                padding: "10px",
                boxSizing: "border-box",
                border: "1px solid #e1e1e1",
              }}
              name="address"
              onChange={handleFormChange}
              type="text"
              required
              value={customerFormData.address}
            />
            {formErrors.address.error ? (
              <ErrorValidationLabel txtLbl={formErrors.address.requiredText} />
            ) : (
              ""
            )}
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Address 2
            </label>
            <textarea
              style={{
                maxWidth: "100%",
                width: "100%",
                padding: "10px",
                boxSizing: "border-box",
                border: "1px solid #e1e1e1",
              }}
              name="address2"
              type="text"
              onChange={handleFormChange}
              value={customerFormData.address2 || ""}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              City
            </label>
            <input
              style={{
                maxWidth: "100%",
                width: "100%",
                padding: "10px",
                boxSizing: "border-box",
                border: "1px solid #e1e1e1",
              }}
              name="city"
              type="text"
              onChange={handleFormChange}
              required
              value={customerFormData.city}
            />
            {formErrors.city.error ? (
              <ErrorValidationLabel txtLbl={formErrors.city.requiredText} />
            ) : (
              ""
            )}
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              State
            </label>
            <select
              value={customerFormData.state}
              className="select"
              onChange={handleChangeState}
            >
              {stateOptions.map((state) => (
                <option>{state}</option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Zip Code
            </label>
            <input
              style={{
                maxWidth: "100%",
                width: "100%",
                padding: "10px",
                boxSizing: "border-box",
                border: "1px solid #e1e1e1",
              }}
              name="zip_code"
              type="text"
              minLength={5}
              maxLength={5}
              onChange={handleFormChange}
              required
              value={customerFormData.zip_code}
            />
            {formErrors.zip_code.error ? (
              <ErrorValidationLabel txtLbl={formErrors.zip_code.requiredText} />
            ) : (
              ""
            )}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button
              type="submit"
              className="button"
              style={{ padding: "10px 35px" }}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const CustomerDirectory = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customers, setCustomers] = useState(initCustomerData);
  const [showEditCustomerDialog, setShowEditCustomerDialog] = useState(false);
  const [isAdd, setIsAdd] = useState(false);

  const handleEdit = useCallback((customer) => {
    setSelectedCustomer({
      ...customer,
    });
    setShowEditCustomerDialog(true);
  }, []);

  const storeCustomers = useCallback((data) => {
    localStorage.setItem(constants.customers_data, JSON.stringify(data));
  }, []);

  const handleFormSave = (updatedData) => {
    let updatedCustomersData;
    if (isAdd) {
      const maxCustomerId = customers.reduce(
        (result, customer) =>
          (result =
            result > customer.customer_id ? result : customer.customer_id),
        0
      );
      updatedCustomersData = [
        ...customers,
        { customer_id: maxCustomerId + 1, ...updatedData },
      ];
    } else {
      const customerIndex = customers.findIndex(
        (customerObj) =>
          customerObj.customer_id === selectedCustomer.customer_id
      );
      if (customerIndex > -1) {
        updatedCustomersData = customers.slice();
        updatedCustomersData[customerIndex] = {
          ...updatedCustomersData[customerIndex],
          ...updatedData,
        };
      }
    }
    storeCustomers(updatedCustomersData);
    setCustomers([...updatedCustomersData]);
    handleDialogClose();
    setIsAdd(false);
  };

  const handleDialogClose = () => {
    setShowEditCustomerDialog(false);
    setSelectedCustomer(null);
    setIsAdd(false);
  };

  const handleDelete = useCallback(
    (customerData) => {
      if (
        // eslint-disable-next-line no-restricted-globals
        confirm(
          `Are you sure you want to delete this user with name ${customerData.first_name} ${customerData.last_name}`
        )
      ) {
        const customerIndex = customers.findIndex(
          (customerObj) => customerObj.customer_id === customerData.customer_id
        );
        if (customerIndex > -1) {
          const updatedCustomersData = customers.slice();
          updatedCustomersData.splice(customerIndex, 1);
          storeCustomers(updatedCustomersData);
          setCustomers([...updatedCustomersData]);
        }
      }
    },
    [customers, storeCustomers]
  );

  const handleAdd = useCallback(() => {
    setSelectedCustomer({ ...emptyCustomerData, state: stateOptions[0] });
    setShowEditCustomerDialog(true);
    setIsAdd(true);
  }, []);

  useEffect(() => {
    let storedCustomers = null;
    try {
      const storedCustomersData = localStorage.getItem(
        constants.customers_data
      );
      if (storedCustomersData) {
        storedCustomers = JSON.parse(storedCustomersData);
      }
    } catch (error) {
      storedCustomers = null;
    }

    if (storedCustomers) {
      setCustomers([...storedCustomers]);
    }
  }, []);

  return (
    <div className="App">
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <h1 style={{ marginLeft: "10px" }}>Customers:</h1>
        <button className="button" onClick={handleAdd}>
          Add customer
        </button>
      </div>
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {customers.map((customer) => (
          <Customer
            key={customer.customer_id}
            data={customer}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
      {showEditCustomerDialog ? (
        <EditCustomerDialog
          customerInfo={selectedCustomer}
          onSave={handleFormSave}
          onExit={handleDialogClose}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default CustomerDirectory;
