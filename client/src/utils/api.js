import axios from 'axios';

export const getUserFullInfo = async (initialData, id) => {
  const init = [...initialData];
  const data = init.map((i) => i.user_id);

  try {
    const req = await axios.get('https://server-orcin-omega.vercel.app/', {
      params: { type: 'user', data, id },
    });

    if (req.status === 200) {
      const { response } = req.data;
      const itemsUpdated = init.map((i) => {
        const item = response.filter((j) => j.user_id === i.user_id);
        return { ...item[0], ...i };
      });

      console.log('itemsUpdated', itemsUpdated);

      return itemsUpdated;
    }
  } catch (error) {
    console.log('fetchDB error', error);
  }
};

export const getChatData = async (period, id) => {
  try {
    const date = new Date();
    const req = await axios.get('https://server-orcin-omega.vercel.app/', {
      // todo: period
      params: { type: 'chat', period, id },
    });
    if (req.status === 200) {
      return {
        data: req.data.response,
        id,
        period,
        date,
      };
    }
  } catch (error) {
    console.log(error);
  }
};
