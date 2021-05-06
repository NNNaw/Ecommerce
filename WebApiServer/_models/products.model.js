const mongoose = require('mongoose');



// var productItemSchema = new mongoose.Schema({
//   name: { type: String },
//   alias: { type: String, require: true },
//   options: [
//     {
//       rom: { type: Number, require: true },
//       nameOption: { type: String },
//       aliasOption: { type: String, require: true },
//       images: [
//         {
//           url: { type: String, require: true },
//           Id_cloud: { type: String, default: "" },
//           dateCreated: { type: Date, default: Date.now },

//           color: { type: String, require: "Đen" },

//           price: { type: Number, default: 100000 },
//           quantity: { type: Number, default: 11 },
//           employee_Product: {
//             _id: {
//               type: String,
//               required: true
//             },
//             account: {
//               type: String,
//               required: true
//             }
//           },
//           sale_off: {
//             isSale_Off: { type: Boolean, default: false },
//             percent: { type: Number, default: 0 },
//             dateStart: { type: Date, require: false },
//             dateEnd: { type: Date, require: false },
//           },

//         }
//       ]

//     }
//   ]
//   ,
//   boxItems: [
//     {
//       type: String,
//       require: false
//     }
//   ],
//   contentDiscount: [
//     {
//       type: String,
//       require: false
//     }
//   ],
//   screen: [
//     {
//       type: String,
//       require: false
//     }
//   ],
//   camera: {
//     front: { type: Number, default: 11 },
//     back: { type: Number, default: 19 },
//   },
//   ram: { type: Number, default: 1 },
//   cpu: { type: String, require: false, default: "A14 Bionic" },
//   gpu: { type: String, require: false, default: "Apple GPU 4 nhân" },
//   battery: { type: Number, default: 1000 },
//   Specialfeatures: {
//     networks: { type: String, require: false, default: "5G" },
//     waterProof: { type: String, require: false, default: "IP68" },
//     wireless_charging: { type: Boolean, default: false },
//     auth_user: { type: String, require: false, default: "Face Id" },
//     Sim: { type: String, require: false, default: "eSim" }
//   },
//   origin: { type: String, default: "USA" },
//   material: { type: String, default: "Nhôm" },
//   OS: { type: String, default: "iOS 14" },
//   warranty_period: { type: Number, default: 12 },

//   descript: { type: String, default: "descript" },



// });


var productSchema = new mongoose.Schema({
  alias_Series: { type: String, require: true },

  name: { type: String },
  alias_Product: { type: String, require: true },
  options: [
    {
      rom: { type: Number, require: true },
      nameOption: { type: String },
      alias_Option: { type: String, require: true },
      sale_off: {
        isSale_Off: { type: Boolean, default: false },
        percent: { type: Number, default: 0 },
        dateStart: { type: Date, require: false },
        dateEnd: { type: Date, require: false },
      },
      price: { type: Number, default: 100000 },
      images: [
        {
          url: { type: String, require: true },
          Id_cloud: { type: String, default: "" },
          dateCreated: { type: Date, default: Date.now },

          color: { type: String, require: "Đen" },


          quantity: { type: Number, default: 11 },
          employee_Product: {
            _id: {
              type: String,
              required: true
            },
            account: {
              type: String,
              required: true
            }
          },


        }
      ]

    }
  ]
  ,
  boxItems: [
    {
      type: String,
      require: false
    }
  ],
  contentDiscount: [
    {
      type: String,
      require: false
    }
  ],
  screen: [
    {
      type: String,
      require: false
    }
  ],
  camera: {
    front: { type: Number, default: 11 },
    back: { type: Number, default: 19 },
  },
  ram: { type: Number, default: 1 },
  cpu: { type: String, require: false, default: "A14 Bionic" },
  gpu: { type: String, require: false, default: "Apple GPU 4 nhân" },
  battery: { type: Number, default: 1000 },
  Specialfeatures: {
    networks: { type: String, require: false, default: "5G" },
    waterProof: { type: String, require: false, default: "IP68" },
    wireless_charging: { type: Boolean, default: false },
    auth_user: { type: String, require: false, default: "Face Id" },
    Sim: { type: String, require: false, default: "eSim" }
  },
  origin: { type: String, default: "USA" },
  material: { type: String, default: "Nhôm" },
  OS: { type: String, default: "iOS 14" },
  warranty_period: { type: Number, default: 12 },

  descript: { type: String, default: "descript" },


});

var Product = mongoose.model('Product', productSchema, 'Products');
// var Product = mongoose.model('Product', productSchema);

module.exports = Product;