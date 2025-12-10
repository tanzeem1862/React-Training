import React, { useState, useEffect } from 'react';

const initialFormState = {
  name: '',
  email: '',
  rating: 5, 
  comments: '',
};

const FeedbackForm = ({ onSubmit, isSubmitting, submitSuccess, error }) => {
  const [form, setForm] = useState(initialFormState);
  
  useEffect(() => {
    if (submitSuccess) {
      const timer = setTimeout(() => {
        console.log("Success message shown.");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [submitSuccess]);


  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await onSubmit(form);
    if (success) {
      setForm(initialFormState); 
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-xl border border-indigo-100">
      <h2 className="text-2xl font-bold mb-6 text-indigo-700">Submit Feedback</h2>
      
      {isSubmitting && <div className="text-blue-500 mb-4">Submitting...</div>}
      {error && <div className="text-red-500 mb-4 font-bold">{error}</div>}
      {submitSuccess && !isSubmitting && <div className="text-green-500 mb-4 font-bold">Feedback Submitted Successfully!</div>}
      
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Rating (1-5)</label>
        <select
          id="rating"
          name="rating"
          value={form.rating}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        >
          {[1, 2, 3, 4, 5].map(r => (
            <option key={r} value={r}>{r} Star{r > 1 && 's'}</option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label htmlFor="comments" className="block text-sm font-medium text-gray-700">Comments</label>
        <textarea
          id="comments"
          name="comments"
          value={form.comments}
          onChange={handleChange}
          rows={3}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="cursor-pointer w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md disabled:bg-indigo-300 transition duration-150 ease-in-out"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
      </button>
    </form>
  );
};

export default FeedbackForm;