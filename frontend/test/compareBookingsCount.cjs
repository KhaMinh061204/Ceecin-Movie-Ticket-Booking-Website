const { Builder, By, until } = require("selenium-webdriver");
const { MongoClient, ObjectId } = require("mongodb");

async function runTest() {
  const userEmail = "test@gmail.com"; // email
  const client = new MongoClient(
    "mongodb+srv://19522529:qviswc6RBEJIblEZ@cluster0.1qcpp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );

  await client.connect();
  const db = client.db("test");

  // lấy user_id qua email
  const user = await db.collection("accounts").findOne({ username: userEmail });
  if (!user) throw new Error("User not found");

  // đếm số lượng vé đã đặt từ database
  const bookingCount = await db
    .collection("bookings")
    .countDocuments({ user_id: user._id });

  console.log(bookingCount);

  // login trước
  const driver = await new Builder().forBrowser("chrome").build();
  // 1 | open | / |
  await driver.get("http://localhost:3001/");
  // 2 | setWindowSize | 2064x1265 |
  await driver.manage().window().setRect({ width: 2064, height: 1265 });
  // 3 | click | css=#login |
  await driver.findElement(By.css("#login")).click();
  // 4 | click | id=mailinp |
  await driver.findElement(By.id("mailinp")).click();
  // 5 | type | id=mailinp | test@gmail.com
  await driver.findElement(By.id("mailinp")).sendKeys("test@gmail.com");
  // 6 | type | id=passinp | 1234!@#$qwerQWER
  await driver.findElement(By.id("passinp")).sendKeys("1234!@#$qwerQWER");
  // 8 | click | css=#loginbtn |
  await driver.findElement(By.css("#loginbtn")).click();
  await driver.wait(until.alertIsPresent(), 1000); // chờ tối đa 1s cho alert
  const alert = await driver.switchTo().alert();
  await alert.accept(); // đóng alert
  await driver.get("http://localhost:3001/profile/myorder"); // đi tới trang hiển thị vé đã đặt
  console.log('------------------------------D O N E   H E R E-------------------------------');

  // dùng selenium để đếm số lượng vé đã đặt hiển thị trên webpage
  // mỗi vé đã đặt được hiển thị trên UI với class là `.film-order-container`
  const bookingElements = await driver.findElements(
    By.css(".film-order-container")
  );
  const uiBookingCount = bookingElements.length;

  console.log(`DB bookings: ${bookingCount}, UI bookings: ${uiBookingCount}`);

  // so sánh 
  console.assert(
    bookingCount === uiBookingCount,
    "Mismatch between DB and UI booking count"
  );

  await driver.quit();
  await client.close();
}

runTest().catch(console.error);
