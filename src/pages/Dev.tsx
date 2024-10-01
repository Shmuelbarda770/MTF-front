import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Side from '../components/Side';
import Table from '../components/Table';
import PopUpCardCreate from '../components/PopUpCardCreate';

const Dev: React.FC = () => {
  const [isAsideOpen, setAsideOpen] = useState<boolean>(false);
  const [isCardVisible, setCardVisible] = useState(false);

  const toggleAside = () => {
    setAsideOpen(!isAsideOpen);
  };

  const showCard = () => {
    setCardVisible(true);
  };

  const hideCard = () => {
    setCardVisible(false);
  };

  useEffect(() => {
    // בדוק את רוחב החלון
    const handleResize = () => {
      if (window.innerWidth >= 768) { // תוכל לשנות את הערך לפי הצורך שלך
        setAsideOpen(true); // פתח את ה-aside במחשב
      } else {
        setAsideOpen(false); // סגור את ה-aside במובייל
      }
    };

    // קוראים לפונקציה פעם אחת כשהקומפוננטה נטענת
    handleResize();

    // הוספת מאזין לאירוע שינוי גודל החלון
    window.addEventListener('resize', handleResize);

    // הסרת המאזין כשהקומפוננטה נעלמת
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={`flex flex-col min-h-screen transition-transform duration-300 ${isAsideOpen ? 'mr-[150px]' : 'mr-0'}`}>
      <Header toggleAside={toggleAside} />
      <main className="flex-grow bg-gray-100 p-4">

      {/* create new user button */}
      <button onClick={showCard}className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600">Create new user</button>
      {isCardVisible && <PopUpCardCreate onClose={hideCard} />}

        <div className="container mx-auto bg-white shadow-md rounded-lg p-6"> 
          <Table />
        </div>
      </main>
      <Footer />
      <Side isOpen={isAsideOpen} />
    </div>
  );
};

export default Dev;
