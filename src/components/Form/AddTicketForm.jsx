import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { imageUpload } from "../../utils";
import { useMutation } from "@tanstack/react-query";
import LoadingSpinner from "../Shared/LoadingSpinner";
import ErrorPage from "../../pages/ErrorPage";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";


 
const AddTicket = () => {
  const {user} = useAuth()
  // const axiosSecure = useAxiosSecure()

  //use Mutation hook useCase
const { isPending, isError, mutateAsync } = useMutation({
  mutationFn: async (payload) => {
    // const res = await axiosSecure.post('/flights', payload);
    const res =  await axios.post(`${import.meta.env.VITE_API_URL}/flights`,payload,{headers:{Authorization:`bearer ${user.accessToken}`}})
    return res.data;
  },
  onSuccess: () => {
    toast.success("Ticket added successfully");
  },
  onError:error => {
    console.log(error)
  },
  onMutate: payload => {
    console.log('I will post this data--->', payload)
  },
  onSettled: (data,error) => {
    console.log(data)
    if(error) console.log(error)
  },
retry: 3,
  })


 const [data, setData] = useState({
  title: "",
  from: "",
  to: "",
  transport: "",
  price: "",
  quantity: "",
  date: "",
  time: "",
  perks: [],
  image: "",
  verificationStatus:"pending",
  vendorImage:user?.photoURL,
  vendorName: user?.displayName,
  vendorEmail: user?.email,
});

const handleChange = (e) => {
  const { name, value, type, checked } = e.target;

  if (type === "checkbox") {
    // perks support
    setData((prev) => {
      if (checked) {
        return { ...prev, perks: [...prev.perks, value] };
      } else {
        return { ...prev, perks: prev.perks.filter((item) => item !== value) };
      }
    });
  }

  else if (type === "file")
  {
    setData({ ...data, image: e.target.files[0] });
  }
    
  else 
  {
    setData({ ...data, [name]: value });
  }
};



const handleSubmit = async (e) => {
  e.preventDefault();

  if (!data.image) {
    alert("Please select an image!");
    return;
  }

  try {
   const imageFile = e.target.image.files[0];
    if (!imageFile) throw new Error("Please select an image!");

   // Image upload using previous function
    const imageUrl = await imageUpload(imageFile);

    // Prepare ticket data
    const ticketData = {
      ...data,        
      image: imageUrl 
    };
    await mutateAsync(ticketData)

    // // 3️⃣ POST ticket data to your backend
    // const res = await axios.post("http://localhost:3000/flights", ticketData);

    // console.log("Ticket added successfully:", res.data);
    // alert("Ticket added successfully!");

    // Optional: reset form
    setData({
      title: "",
      from: "",
      to: "",
      transport: "",
      price: "",
      quantity: "",
      date: "",
      time: "",
      perks: [],
      image: "",
      verificationStatus:"pending",
      vendorImage: user?.photoURL,
      vendorName: user?.displayName,
      vendorEmail: user?.email,
    });

  } catch (err) {
    console.error("Error uploading ticket:", err);
    alert("Failed to add ticket!");
  }
};

 if(isPending) return <LoadingSpinner></LoadingSpinner>
 if(isError) return <ErrorPage></ErrorPage>

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-lg p-8 rounded-xl my-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-500">Add New Ticket</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Ticket Title */}
        <div className="form-control">
          <label className="label">
          <span className="font-semibold">Ticket Title</span>
          </label>
          <input 
          name='title'
          type="text" 
          id='title'
          className="input input-bordered w-full"
           placeholder="Ex: Dhaka to Cox's Bazar"
           value={data.title}
           onChange={handleChange}
           />
         

        </div>

        {/* Transport Type */}
        <div className="form-control">
          <label className="label">
          <span className="font-semibold">Transport Type</span>
            
          </label>
          <select 
            name="transport"
             className="select select-bordered w-full"
              value={data.transport}
              onChange={handleChange}
          >
            <option>Bus</option>
            <option>Train</option>
            <option>Airplane</option>
            <option>Ship</option>
          </select>
        </div>

        {/* From Location */}
        <div className="form-control">
          <label className="label"><span className="font-semibold">From (Location)</span></label>
          <input
           type="text" 
           name="from"
          className="input input-bordered w-full" 
          placeholder="Ex: Dhaka" 
           value={data.from}
          onChange={handleChange}
    />
        </div>

        {/* To Location */}
        <div className="form-control">
          <label className="label"><span className="font-semibold">To (Location)</span></label>
          <input 
          type="text" 
          name="to"
          className="input input-bordered w-full" 
          placeholder="Ex: Cox's Bazar"
          value={data.to}
          onChange={handleChange}
     />
        </div>

        {/* Price Per Ticket */}
        <div className="form-control">
          <label className="label"><span className="font-semibold">Price (Per Unit)</span></label>
          <input 
         type="number"
    name="price"
    placeholder="Price"
    className="input input-bordered w-full"
    value={data.price}
      onChange={(e) =>
    setData({ ...data, price: Number(e.target.value) })
  }
     />
        </div>

        {/* Ticket Quantity */}
        <div className="form-control">
          <label className="label"><span className="font-semibold">Ticket Quantity</span></label>
          <input 
             type="number"
            name="quantity"
           placeholder="Ticket Quantity"
           className="input input-bordered w-full"
           value={data.quantity}
            onChange={(e) =>
    setData({ ...data, quantity: Number(e.target.value) })
  }
          />
        </div>

        {/* Departure Date */}
        <div className="form-control">
          <label className="label"><span className="font-semibold">Departure Date</span></label>
          <input 
            type="date"
        name="date"
       className="input input-bordered w-full"
       value={data.date}
       onChange={handleChange}
           />
        </div>

        {/* Departure Time */}
        <div className="form-control">
          <label className="label"><span className="font-semibold">Departure Time</span></label>
          <input 
             type="time"
    name="time"
    className="input input-bordered w-full"
    value={data.time}
    onChange={handleChange}/>
        </div>

        {/* Perks */}
        <div className="form-control md:col-span-2">
          <label className="label"><span className="font-semibold">Perks</span></label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <label className="cursor-pointer flex gap-2">
              <input type="checkbox"
        name="perks"
        value="AC"
        onChange={handleChange}
        className="checkbox checkbox-success"/> AC
            </label>
            <label className="cursor-pointer flex gap-2">
              <input type="checkbox"
        name="perks"
        value="Wifi"
        onChange={handleChange}
        className="checkbox checkbox-success"/> WiFi
            </label>
            <label className="cursor-pointer flex gap-2">
              <input  type="checkbox"
              name="perks"
              value="Breakfast"
              onChange={handleChange}
              className="checkbox checkbox-success"/> Breakfast
            </label>
            <label className="cursor-pointer flex gap-2">
              <input  type="checkbox"
        name="perks"
        value="Water Bottle"
        onChange={handleChange}
        className="checkbox checkbox-success" /> Water Bottle
            </label>
          </div>
        </div>

        {/* Image Upload */}
        <div className="form-control md:col-span-2">
          <label className="label"><span className="font-semibold">Upload Image</span></label>
          <input
          name="image"
            type="file"
            className="file-input file-input-bordered w-full"
            accept="image/*"
            onChange={handleChange}
          />
        </div>

        {/* Vendor Name (readonly) */}
        <div className="form-control">
          <label className="label"><span className="font-semibold">Vendor Name</span></label>
          <input
            type="text"
           readOnly
           value={data.vendorName}
           className="input input-bordered w-full"
          />
        </div>

        {/* Vendor Email (readonly) */}
        <div className="form-control">
          <label className="label"><span className="font-semibold">Vendor Email</span></label>
          <input
             type="email"
             readOnly
            value={data.vendorEmail}
            className="input input-bordered w-full"
          />
        </div>

        {/* Submit */}
        <div className="md:col-span-2 mt-4">
          {/* <button className="btn btn-success w-full text-white text-lg font-semibold">
            Add Ticket
          </button> */}
          <button className="btn btn-success w-full text-white text-lg font-semibold">
  <div className="wrapper">
    <div className="flower flower1"><div className="petal"></div><div className="petal two"></div></div>
    <div className="flower flower2"><div className="petal"></div><div className="petal three"></div></div>
    <div className="flower flower3"><div className="petal"></div><div className="petal four"></div></div>
    <div className="flower flower4"><div className="petal"></div><div className="petal two"></div></div>
    <div className="flower flower5"><div className="petal"></div><div className="petal three"></div></div>
    <div className="flower flower6"><div className="petal"></div><div className="petal four"></div></div>
    {
      isPending?( <TbFidgetSpinner className='animate-spin m-auto' />

      ):(
        'Add Ticket'
      )
    }
  </div>
</button>
        </div>

      </form>
    </div>
  );
};

export default AddTicket;
