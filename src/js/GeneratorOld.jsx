import React from 'react'
import { DateRange } from 'react-date-range'

// Connection BDD mysql
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'plasticbox'
});

var Generator = React.createClass({
    propTypes: {
        connectToDB: React.PropTypes.func,
        insertToDB: React.PropTypes.func
    },

    //Initialisation des variables
     getInitialState: function() {
         return {
             handleDate: '',
             generatedDate: '',
             commandNumber: 0,
             MaxProduct: 0,
             MaxQuantity: 0
        };
    },

    // main(commandNumber, MaxProduct, MaxQuantity, event){
    //     this.generator(commandNumber, MaxProduct, MaxQuantity, event, function(){
    //         //this.Compute_Order_Price();
    //     }.bind(this));
    // },
    generator(commandNumber, MaxProduct, MaxQuantity, event){
        const {connectToDB, insertToDB} = this.props;
        // Generate Date
        let startDate = this.state.handleDate.startDate;
        let endDate = this.state.handleDate.endDate;
            // Select Product Table
        connectToDB('SELECT * FROM plasticbox.products;', function(Product_Table){
            console.log(Product_Table);
            // Select Client Table
            connectToDB('SELECT * FROM plasticbox.customers;', function(Client_Table){
                console.log(Client_Table);
                for (var i=0; i < commandNumber; i++) {
                    this.randomDate(startDate, endDate);
                    var
                        Preparation_Date, Delivery_Date,
                        Order_Date = this.state.generatedDate,
                        Client_ID = Math.floor(Math.random() * Client_Table.length) + 1,
                        Product_Number =  Math.floor(Math.random() * MaxProduct) + 1;
                    connectToDB('SELECT * FROM plasticbox.orders;', function(Order_Table){
                        var Order_ID = Order_Table.length + 1;
                        for (var i=0; i < Product_Number; i++) {
                            var Product_ID = Math.floor(Math.random() * Product_Table.length) + 1;
                            var Product_Quantity = Math.floor(Math.random() * MaxQuantity) + 1;
                            // console.log('Product_ID',Product_ID);
                            // console.log('Product_Quantity : ',Product_Quantity);

                            connectToDB('SELECT PriceProduct FROM plasticbox.products WHERE RefProduct = ' + Product_ID +';', function(Product_Price){
                                let TotalPrice  = Product_Price[0].PriceProduct * Product_Quantity;
                                let InsertQuery = { RefOrder: Order_ID,
                                                RefProduct: Product_ID,
                                                QuantityProduct: Product_Quantity,
                                                ProductPrice: TotalPrice
                                            };
                            insertToDB('INSERT INTO plasticbox.commandsproduct SET ? ', InsertQuery);
                            //console.log(TotalPrice);
                            }.bind(this));
                        }
                    }.bind(this));
                    let InsertQuery = { RefCustomer: Client_ID,
                                        OrderDate: Order_Date,
                                        PreparationDate: '2016-09-21 3:13',
                                        DeliveryDate: '2016-09-21 3:13',
                                    };
                    insertToDB('INSERT INTO plasticbox.orders SET ? ', InsertQuery);
                }
            }.bind(this));
        }.bind(this));
    },

    Compute_Order_Price() {
        const {connectToDB, insertToDB} = this.props;
        // Select Product Table
        console.log('inside Compute_Order_Price');
        connectToDB('SELECT RefOrder FROM plasticbox.orders WHERE PublicPrice IS NULL;', function(Order_ID){
            for (var i=0; i < Order_ID.length; i++) {
                //console.log(Order_ID[i].RefOrder);
                let ID = Order_ID[i].RefOrder;
                connectToDB('SELECT ProductPrice FROM plasticbox.commandsproduct WHERE RefOrder ='+ID+';', function(Product_Price){
                    console.log(Product_Price);
                    var Order_Price = 0;
                    for (var i=0; i < Product_Price.length; i++) {
                        Order_Price = Order_Price + parseInt(Product_Price[i].ProductPrice);
                    }
                    let InsertQuery = { PublicPrice: Order_Price };
                    insertToDB('UPDATE plasticbox.orders SET ? WHERE RefOrder ='+ID, InsertQuery);
                }.bind(this));
            }
        }.bind(this));
    },

    handleSelect(handleSelect){
        this.setState({handleDate: handleSelect});
        console.log(this.state.handleDate); // Momentjs object
    },

    randomDate(start, end) {
        var date = new Date(start + Math.random() * (end - start));
        this.setState({generatedDate: date});
        //console.log('Generated Date : ', date);
    },

    handleChange(value, event){
        this.setState({commandNumber: event.target.value});
    },

    render() {
        //let result = this.props.queryResult;
        let commandNumber = this.state.commandNumber;
        let MaxProduct = this.state.MaxProduct;
        let MaxQuantity = this.state.MaxQuantity;

        return (
            <div className="generator-container">
                <div className="title">
                    <h1> Data Generator </h1>
                </div>
                <div className="ui form custom">
                    <div className="field custom">
                        <label>Number of order</label>
                        <input  type="text"
                                name="order-number"
                                value={commandNumber}
                                onChange={(event) => this.setState({commandNumber: event.target.value})}
                                placeholder="00"/>
                        <label>Product per order</label>
                        <input  type="text"
                                name="order-number"
                                value={MaxProduct}
                                onChange={(event) => this.setState({MaxProduct: event.target.value})}
                                placeholder="00"/>
                        <label>Max quantity per product</label>
                        <input  type="text"
                                name="order-number"
                                value={MaxQuantity}
                                onChange={(event) => this.setState({MaxQuantity: event.target.value})}
                                placeholder="00"/>
                    </div>
                    <button className="ui blue button"
                        onClick={this.generator.bind(this, commandNumber, MaxProduct, MaxQuantity)}>Submit</button>
                </div>
                <div className="Datepicker">
                    <DateRange
                       onInit={this.handleSelect}
                       onChange={this.handleSelect}
                       theme={{
                                DateRange      : {
                                  background   : 'transparent'
                                },
                               Calendar       : {
                                 background   : '#3B3C3D',
                                 color        : '#ECF0F1',
                               }
                          }}
                   />
                </div>
            </div>
        );
      }
  });

export default Generator;
