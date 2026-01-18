import React from 'react';
import { HiArrowUpRight } from 'react-icons/hi2';

const Faq = () => {
  return (
    <div>
      <div className="w-[830px] mx-auto mb-[40px]">
        <h3 className="text-3xl font-bold text-center">
          Frequently Asked Question (FAQ)
        </h3>
        <p className="text-center mt-[24px]">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce pain, and strengthen your body
          with ease!
        </p>
      </div>
      <div className="space-y-[20px]">
        <div className="collapse collapse-arrow bg-base-100 border border-base-300">
          <input type="radio" name="my-accordion-2" defaultChecked />
          <div className="collapse-title font-semibold">
            How do I create an account?
          </div>
          <div className="collapse-content text-sm">
            Click the "Sign Up" button in the top right corner and follow the
            registration process.
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-100 border border-base-300">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title font-semibold">
            I forgot my password. What should I do?
          </div>
          <div className="collapse-content text-sm">
            Click on "Forgot Password" on the login page and follow the
            instructions sent to your email.
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-100 border border-base-300">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title font-semibold">
            How do I update my profile information?
          </div>
          <div className="collapse-content text-sm">
            Go to "My Account" settings and select "Edit Profile" to make
            changes.
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mt-[40px]">
        <button class="btn btn-primary text-black rounded-lg">
          See More FAQ’s
        </button>
        <HiArrowUpRight className="w-9 h-9 rounded-full bg-black text-primary p-2" />
      </div>
    </div>
  );
};

export default Faq;
