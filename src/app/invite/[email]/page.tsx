"use client"
import 'react-phone-input-2/lib/style.css'
import { AcceptAdminInviteApi, getCoordinateApi } from '@/apis';
import ActivityLoader from '@/components/ActivityLoader';
import { ColorSchema } from '@/helper/colorScheme';
import { ErrorMessage, Form, Formik } from 'formik'
import React, { useRef, useState } from 'react'
import { BsCamera } from 'react-icons/bs'
import PhoneInput from 'react-phone-input-2'
import * as Yup from 'yup';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { errorToast, successToast } from '@/helper/functions';
import { useParams, useRouter } from 'next/navigation';

const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    password: Yup.string().required('Password is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    postalCode: Yup.string().required('Postal Code is required'),
    country: Yup.string().required('Country is required'),
});

const apiKey = process.env.GOOGLE_API_KEY || "AIzaSyD_hA8Lkcm7jjW6gM9_-VgZjD4O9DJr5dA";

function Invite() {

    const router = useRouter()
    const { email }: { email: string } = useParams()
    const inputRef = useRef<any>(null);

    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false)

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result) {
                    setSelectedImage(e.target.result as string); // Set image preview URL
                }
            };
            reader.readAsDataURL(file); // Read the file as a data URL
        }
    };

    const handlePlaceSelect = async (place: any, setFieldValue: any) => {

        // Extracting location details (coordinates, address, etc.)          
        if (place?.value?.place_id) {

            getCoordinateApi(place?.value?.place_id, response => {
                if (!response?.error) {

                    setFieldValue('country', response?.coordinate?.country);
                    setFieldValue('streetAddress', place?.label)
                    setFieldValue('city', response?.coordinate?.city);
                    setFieldValue('state', response?.coordinate?.state);
                    setFieldValue('postalCode', response?.coordinate?.postalCode);
                }
            })
        } else {
            setFieldValue("latitude", 0);
            setFieldValue("longitude", 0);
        }
    };

    const submitFunc = (values: any) => {

        const formData = new FormData();
        if (inputRef.current?.files?.[0]) {
            formData.append("profile_image", inputRef.current.files[0])
        }

        formData.append('email', decodeURIComponent(email));
        formData.append('password', values?.password);
        formData.append('phone_number', values?.phoneNumber);
        formData.append('phone_country_code', values?.phoneNumberCode);
        formData.append('name', values?.name);
        formData.append('street_address', values?.streetAddress);
        formData.append('city', values?.city);
        formData.append('state', values?.state);
        formData.append('postal_code', values?.postalCode);
        formData.append('country', values?.country);
        setLoading(true);
        AcceptAdminInviteApi(formData, response => {
            setLoading(false);
            if (!response.error) {
                successToast(`${response.message}. Login to continue`);
                router.push("/");
            } else {
                errorToast(response.message);
            }
        });
    }

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">

            {/* First form tab */}
            <div className="w-[90%] md:w-[60%] space-y-8 bg-white p-10 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-900">Complete Profile</h2>
                <p className="text-sm text-gray-600 mb-4">
                    Please provide more information about yourself and your role. This will help us create your admin profile and ensure you have the right access and tools to support the platform effectively.
                </p>

                <Formik
                    initialValues={{
                        name: '',
                        phoneNumber: '',
                        password: '',
                        streetAddress: '',
                        city: '',
                        state: '',
                        phoneNumberCode: "",
                        postalCode: '',
                        country: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={submitFunc}>
                    {({ setFieldValue, values }) => (
                        <>
                            <div className="flex items-center mb-4">
                                <input onChange={handleImageChange} type="file" className='hidden' ref={inputRef} accept="image/*" />
                                <div className="w-24 h-24 rounded-full border flex items-center justify-center bg-gray-100 text-gray-400">
                                    {selectedImage ? (
                                        <img
                                            src={selectedImage}
                                            alt="Uploaded logo"
                                            className="w-full h-full rounded-full object-cover"
                                        />
                                    ) : (
                                        <BsCamera size={25} color={ColorSchema.black} />
                                    )}

                                </div>
                                <button onClick={() => inputRef?.current?.click()} className="ml-4 h-8 px-4 py-0 border rounded-md text-[#2c2c2c] text-[14px] bg-[#cdcdcd] border-[#2c2c2c] hover:bg-gray-200">Upload logo</button>
                            </div>

                            <Form className='space-y-4'>

                                <div>
                                    <label className="block text-sm font-medium text-[#5E6366] text-[15px]">Name</label>
                                    <input name="name" onChange={(value) => setFieldValue("name", value.target.value)} type="text" placeholder="" className="mt-1 w-full px-3 py-2 text-black border rounded-md shadow-sm border-[#5E6366] focus:outline-none focus:ring-none focus:ring-[#5E6366]" />
                                    <ErrorMessage
                                        name="name"
                                        component="div"
                                        className="text-red-500 text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[#5E6366] text-[15px]">Password</label>
                                    <input name="password" onChange={(value) => setFieldValue("password", value.target.value)} type="password" placeholder="" className="mt-1 w-full px-3 py-2 text-black border rounded-md shadow-sm border-[#5E6366] focus:outline-none focus:ring-none focus:ring-[#5E6366]" />
                                    <ErrorMessage
                                        name="password"
                                        component="div"
                                        className="text-red-500 text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[#5E6366] text-[15px]">Phone Number</label>
                                    <div className="flex mt-1">
                                        <PhoneInput
                                            country={'fi'}
                                            containerStyle={{ borderWidth: 1, borderColor: "#5E6366", borderRadius: 8, paddingTop: 2, paddingBottom: 2 }}
                                            inputStyle={{ color: ColorSchema.black, width: "100%", border: "none" }}
                                            dropdownStyle={{ color: "black" }}
                                            // value={values.phoneNumber}
                                            onChange={(phone, data: any) => {
                                                setFieldValue('phoneNumber', phone.substring(data.dialCode?.length))
                                                setFieldValue('phoneNumberCode', data.dialCode)

                                            }}
                                        />
                                    </div>
                                    <ErrorMessage
                                        name="phoneNumber"
                                        component="div"
                                        className="text-red-500 text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[#5E6366] text-[15px]">Street Address</label>

                                    <GooglePlacesAutocomplete
                                        apiKey={apiKey}
                                        selectProps={{
                                            onChange: (place) => {
                                                handlePlaceSelect(place, setFieldValue)
                                            },
                                            placeholder: 'Search for a location...',
                                            styles: {
                                                option: (provided) => ({
                                                    ...provided,
                                                    color: 'black',
                                                    fontSize: 14
                                                }),
                                            },
                                        }}
                                    />

                                    <ErrorMessage
                                        name="streetAddress"
                                        component="div"
                                        className="text-red-500 text-sm"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-[#5E6366] text-[15px]">City</label>
                                        <input value={values.city} onChange={(value) => setFieldValue("city", value.target.value)} name="city" type="text" placeholder="Helsinki" className="mt-1 w-full px-3 py-2 text-black border rounded-md shadow-sm border-[#5E6366] focus:outline-none focus:ring-none focus:ring-[#5E6366]" />

                                        <ErrorMessage
                                            name="city"
                                            component="div"
                                            className="text-red-500 text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#5E6366] text-[15px]">State/Province</label>
                                        <input value={values.state} name="state" type="text" onChange={(value) => setFieldValue("state", value.target.value)} placeholder="Helsinki" className="mt-1 w-full px-3 py-2 text-black border rounded-md shadow-sm border-[#5E6366] focus:outline-none focus:ring-none focus:ring-[#5E6366]" />

                                        <ErrorMessage
                                            name="state"
                                            component="div"
                                            className="text-red-500 text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-[#5E6366] text-[15px]">Postal Code</label>
                                        <input name="postalCode" type="text" placeholder="00170" value={values.postalCode} onChange={(value) => setFieldValue("postalCode", value.target.value)} className="mt-1 w-full px-3 py-2 text-black border rounded-md shadow-sm border-[#5E6366] focus:outline-none focus:ring-none focus:ring-[#5E6366]" />
                                        <ErrorMessage
                                            name="postalCode"
                                            component="div"
                                            className="text-red-500 text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#5E6366] text-[15px]">Country</label>
                                        <input name="country" type="text" placeholder="Finland" value={values.country} onChange={(value) => setFieldValue("country", value.target.value)} className="mt-1 w-full px-3 py-2 text-black border rounded-md shadow-sm border-[#5E6366] focus:outline-none focus:ring-none focus:ring-[#5E6366]" />
                                        <ErrorMessage
                                            name="country"
                                            component="div"
                                            className="text-red-500 text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end items-center mt-6">

                                    <button type="submit" className="flex items-center w-[100px] justify-center h-[45px] px-4 py-2 bg-[#1E1E1E] text-white rounded-md focus:outline-none">
                                        {
                                            loading ?
                                                <ActivityLoader /> :
                                                (
                                                    <p className="flex items-center px-4 py-2 text-white rounded-md focus:outline-none">
                                                        Submit
                                                    </p>
                                                )

                                        }
                                    </button>
                                </div>

                            </Form>
                        </>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default Invite