import React from 'react';
import agentImg from '../../assets/agent-pending.png';
import { useForm, useWatch } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import useAxiosSecur from '../../hooks/useAxiosSecur';
import { data, useLoaderData } from 'react-router';
import Swal from 'sweetalert2';

const Rider = () => {
  const { register, handleSubmit, control } = useForm();
  const { user } = useAuth();
  const axoiosSecure = useAxiosSecur();
  const serviceCenters = useLoaderData();
  const regionsDuplicate = serviceCenters.map(c => c.region);

  const regions = [...new Set(regionsDuplicate)];
  // explore useMemo useCallback
  const districtsByRegion = region => {
    const regionDistricts = serviceCenters.filter(c => c.region === region);
    const districts = regionDistricts.map(d => d.district);
    return districts;
  };

  const riderRegion = useWatch({ control, name: 'region' });
  const handleRiderApplication = data => {
    console.log(data);
    axoiosSecure.post('/riders', data).then(res => {
      if (res.data.insertedId) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title:
            'Your application has been submitted. We will reach to you in 145 days',
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };

  return (
    <div className="bg-white my-[50px] py-[80px] px-[109px] rounded-3xl">
      <div className="w-[60%] ">
        <h3 className="text-5xl font-bold">Be a Rider</h3>
        <p className="text-gray-500 mt-2">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
      </div>
      <div className="w-full border-t mt-[30px] border-gray-400 "></div>
      {/* section -2 */}
      <div className="mt-[30px] grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* my form */}

        <div>
          <h2 className="text-2xl font-bold">Tell us about yourself</h2>
          <form onSubmit={handleSubmit(handleRiderApplication)}>
            <div>
              {/* 1 */}
              <fieldset className="fieldset">
                <label className="label text-black">Your Name</label>
                <input
                  type="text"
                  {...register('Name')}
                  className="input w-full text-black"
                  placeholder="Your Name"
                />
              </fieldset>
              {/* 2 */}
              <fieldset className="fieldset">
                <label className="label text-black">
                  Driving License Number
                </label>
                <input
                  type="number"
                  {...register('drivingNumber')}
                  className="input w-full text-black"
                  placeholder="Driving License Number"
                />
              </fieldset>
              {/* 3 */}
              <fieldset className="fieldset">
                <label className="label text-black">Your Email</label>
                <input
                  type="email"
                  {...register('Email')}
                  className="input w-full text-black"
                  placeholder="Your Email"
                />
              </fieldset>
              {/* 4 */}
              <fieldset className="fieldset">
                <label className="label text-black">Your Region</label>
                <select
                  {...register('region')}
                  defaultValue="Pick a region"
                  className="select w-full"
                >
                  <option disabled={true}>Select your Region</option>
                  {regions.map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </fieldset>
              {/* 5 */}
              <fieldset className="fieldset">
                <label className="label text-black">Your District</label>
                <select
                  {...register('district')}
                  defaultValue="Pick a district"
                  className="select w-full"
                >
                  <option disabled={true}>Pick a district</option>
                  {districtsByRegion(riderRegion).map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </fieldset>
              {/* 6 */}
              <fieldset className="fieldset">
                <label className="label text-black">NID No</label>
                <input
                  type="number"
                  {...register('NidNo')}
                  className="input w-full text-black"
                  placeholder="NID No"
                />
              </fieldset>
              {/* 7 */}
              <fieldset className="fieldset">
                <label className="label text-black">Phone Number</label>
                <input
                  type="numer"
                  {...register('phoneNumber')}
                  className="input w-full text-black"
                  placeholder="Phone Number"
                />
              </fieldset>
              {/* 8 */}
              <fieldset className="fieldset">
                <label className="label text-black">
                  Bike Brand Model and Year
                </label>
                <input
                  type="text"
                  {...register('bikeBredModel')}
                  className="input w-full text-black"
                  placeholder="Bike Brand Model and Year"
                />
              </fieldset>
              {/* 9 */}
              <fieldset className="fieldset">
                <label className="label text-black">
                  Bike Registration Number
                </label>
                <input
                  type="number"
                  {...register('bikeNumber')}
                  className="input w-full text-black"
                  placeholder="Bike Registration Number"
                />
              </fieldset>
              {/* 10 */}
              <fieldset className="fieldset">
                <label className="label text-black">
                  Tell Us About Yourself
                </label>
                <input
                  type="text"
                  {...register('aboutYourself')}
                  className="input w-full text-black"
                  placeholder="Tell Us About Yourself"
                />
              </fieldset>
            </div>
            <input
              type="submit"
              value="Apply as a Rider"
              className="btn btn-primary text-black w-full"
            />
          </form>
        </div>
        {/* form img */}
        <div>
          <img src={agentImg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Rider;
