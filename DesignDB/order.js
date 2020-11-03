db.getCollection('Orders').insertMany([

{dateCheckin:"2020-10-30",dateCheckout:"2020-10-31",status:true,address:"Tp Hcm",note:"nothing",
 Id_PaymentMethod:"5f9ed20d4209cb5d9fbccd0d",Id_ShippingMethod:"5f9ed3004209cb5d9fbccd10",Id_Employee:"5f8be1665906063e985f6b44",account:"customer19" ,
    OrderDetail:[
        {Id_Product:"5f9a563c729de7760e21f0c5", quantity: 2},
          {Id_Product:"5f9a563c729de7760e21f0c8", quantity: 3},
          {Id_Product: ObjectId("5f9a563c729de7760e21f0c7"), quantity: 1},
         
    ]
    },
 
 {dateCheckin:"2020-09-10",dateCheckout:"2020-09-15",status:true,address:"Tp Hcm",note:"nothing",
 Id_PaymentMethod:"5f9ed20d4209cb5d9fbccd0e",Id_ShippingMethod:"5f9ed3004209cb5d9fbccd11",Id_Employee:"5f8be1665906063e985f6b44",account:"customer19",
     
      OrderDetail:[
        {Id_Product:"5f9a563c729de7760e21f0c5", quantity: 1},
          {Id_Product:"5f9a563c729de7760e21f0c8", quantity: 1},
          {Id_Product: ObjectId("5f9a563c729de7760e21f0c7"), quantity: 1},
         
    ]
     
     },
 
 {dateCheckin:"2020-11-01",dateCheckout:"",status:false,address:"Tp Hcm",note:"nothing",
 Id_PaymentMethod:"5f9ed20d4209cb5d9fbccd0e",Id_ShippingMethod:"5f9ed3004209cb5d9fbccd11",Id_Employee:"",account:"customer19",
     
      OrderDetail:[
        {Id_Product:"5f9a563c729de7760e21f0c5", quantity: 3},
         
          {Id_Product: ObjectId("5f9a563c729de7760e21f0c7"), quantity: 1},
         
    ]
     }

])