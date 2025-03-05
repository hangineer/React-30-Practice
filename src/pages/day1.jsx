import { useState, useEffect } from "react";

const apiUrl = "https://openholidaysapi.org";

function Day1() {
  const [selectedCountryIso, setSelectedCountryIso] = useState("NL"); // NL(Netherlands) 荷蘭 isoCode
  const [countryList, setCountryList] = useState([]);
  const [holidayList, setHolidayList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${apiUrl}/Countries`);
        if (!res.ok) throw new Error("Can't fetch Country List");

        const data = await res.json(); // 解析 JSON
        const countryInfo = data.map(country => ({
          isoCode: country.isoCode,
          label: country.name.find(el => el.language === "EN").text
        }));
        setCountryList(countryInfo);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);
  useEffect(() => {
    const year = new Date().getFullYear();
    const validFrom = `${year}-01-01`;
    const validTo = `${year}-12-31`;
    const getHolidays = async() => {
      try {
        const res = await fetch(`${apiUrl}/PublicHolidays?countryIsoCode=${selectedCountryIso}&validFrom=${validFrom}&validTo=${validTo}`);
        if (!res.ok) throw new Error("Can't fetch Country List");
        const data = await res.json();
        setHolidayList(data);
      } catch(err) {
        console.error(err);
      }
    }
    getHolidays();
  }, [selectedCountryIso]);

  return (
    <>
      <h2 className="text-2xl">Day 1: Yearly Holidays APP</h2>
      <a href="https://reactpractice.dev/exercise/build-a-public-holidays-app/?utm_source=calendar.reactpractice.dev&utm_medium=social&utm_campaign=calendar-v1">
        題目連結
      </a>
      {/* country */}
      <select
        className="block mt-4 w-100 border p-2"
        name="holidays"
        id="holidays"
        value={selectedCountryIso}
        onChange={e => setSelectedCountryIso(e.target.value)}
      >

        {countryList.map(li => {
          return(
            <option key={li.isoCode} value={li.isoCode}>{li.label}</option>
          )
        })}
      </select>
      <div>
        {holidayList.map(li => {
            const holiday = li.name.find(el => el.language === "EN").text
            return(
              <div key={li.id}>{li.startDate} - {holiday}</div>
            )
          })
        }
      </div>
    </>
  );
}

export default Day1;
