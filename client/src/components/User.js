import React from "react";
import { Icon, Modal, Card } from "web3uikit";
import { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";

function User({account}) {
  const [ isVisible, setVisible ] = useState(false);
  const { Moralis } = useMoralis();
  const [ userRentals, setUserRentals ] = useState();

  useEffect(() => {

    async function fetchRentals() {

      const Rentals = Moralis.Object.extend("newBookings");
      const query = new Moralis.Query(Rentals);
      query.equalTo("booker", account);
      const result = await query.find();

      setUserRentals(result);

    }

    fetchRentals();

  }, [isVisible]);

  return (
    <>
      <div onClick={() => setVisible(true)}>
        <Icon fill="#000000" size={24} svg="user" />
      </div>
      <Modal
        onCloseButtonPressed={() => setVisible(false)}
        hasFooter={false}
        title="Your Stays"
        isVisible={isVisible}
      >
        <div style={{display: "flex", justifyContent: "flex-start", flexWrap: "wrap", gap: "10px"}}>
          { userRentals &&
            userRentals.map(item => {
              return (
                <div style={{width: "200px"}}>
                  <Card
                    isDisabled
                    title={ item.attributes.city }
                    description={ `${item.attributes.datesBooked[0]} for ${item.attributes.length} days` }
                  >
                    <div>
                      <img 
                        width="180px"
                        src={item.attributes.imgUrl}
                        alt="Booking preview"
                      />
                    </div>
                  </Card>
                  
                </div>
              )
            })
          }
        </div>
      </Modal>
    </>
  );
}

export default User;
