import axios from 'axios';

export const getUserFullInfo = async (initialData) => {
  const init = [...initialData];
  const data = init.map((i) => i.user_id);

  try {
    const req = await axios.get('https://tgserver.vercel.app/', {
      params: { type: 'user', data },
    });

    if (req.status === 200) {
      const { response } = req.data;
      const itemsUpdated = init.map((i) => {
        const item = response.data.filter((j) => j.userId === i.userId);
        return { ...i, ...item[0] };
      });

      return itemsUpdated;
    }
    throw new Error('database request error');
  } catch (error) {
    console.log('fetchDB error', error);
  }
};

export const getChatData = async (period, id) => {
  try {
    const date = new Date();
    const req = await axios.get('https://tgserver.vercel.app/', {
      params: { type: 'chat', period, id },
    });
    if (req.status === 200) {
      return {
        data: req.data.response, id, period, date,
      };
    }
    throw new Error('data request error');
  } catch (error) {
    console.log(error);
  }
};

