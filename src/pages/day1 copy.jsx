import { useState, useEffect, useCallback } from "react";

const apiUrl = "https://openholidaysapi.org";

function Day1() {
  const [selectedCountryIso, setSelectedCountryIso] = useState("NL"); // 預設荷蘭
  const [countryList, setCountryList] = useState([]);
  const [holidayList, setHolidayList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // 取得國家列表
  useEffect(() => {
    const fetchCountries = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${apiUrl}/Countries`);
        if (!res.ok) throw new Error("Can't fetch Country List");

        const data = await res.json();
        const countryInfo = data.map(country => ({
          isoCode: country.isoCode,
          label: country.name.find(el => el.language === "EN")?.text || "Unknown"
        }));
        setCountryList(countryInfo);
        setError(""); // 清除錯誤
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountries();
  }, []);

  // 取得假日列表
  const fetchHolidays = useCallback(async () => {
    const year = new Date().getFullYear();
    const validFrom = `${year}-01-01`;
    const validTo = `${year}-12-31`;

    setIsLoading(true);
    try {
      const res = await fetch(`${apiUrl}/PublicHolidays?countryIsoCode=${selectedCountryIso}&validFrom=${validFrom}&validTo=${validTo}`);
      if (!res.ok) throw new Error("Can't fetch Holidays");

      const data = await res.json();
      setHolidayList(data);
      setError(""); // 清除錯誤
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [selectedCountryIso]);

  useEffect(() => {
    fetchHolidays();
  }, [fetchHolidays]);

  return (
    <>
      <h2 className="text-2xl">Day 1: Yearly Holidays APP</h2>
      <a href="https://reactpractice.dev/exercise/build-a-public-holidays-app/?utm_source=calendar.reactpractice.dev&utm_medium=social&utm_campaign=calendar-v1">
        題目連結
      </a>

      {error && <div className="text-red-500">{error}</div>}

      <select
        className="block mt-4 w-100 border p-2"
        name="holidays"
        id="holidays"
        value={selectedCountryIso}
        onChange={e => setSelectedCountryIso(e.target.value)}
      >
        {countryList.map(li => (
          <option key={li.isoCode} value={li.isoCode}>
            {li.label}
          </option>
        ))}
      </select>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {holidayList.length === 0 ? (
            <p>No holidays found.</p>
          ) : (
            holidayList.map(li => {
              const holiday = li.name.find(el => el.language === "EN")?.text || "Unknown";
              return (
                <div key={li.id}>
                  {li.startDate} - {holiday}
                </div>
              );
            })
          )}
        </div>
      )}
    </>
  );
}

export default Day1;
