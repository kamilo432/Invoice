using DevExpress.ExpressApp;
using DevExpress.ExpressApp.Actions;
using JObject = Newtonsoft.Json.Linq.JObject;

namespace Invoice.Module
{
    public class ApiConnection : ViewController
    {
        public void Connection(object s, SimpleActionExecuteEventArgs e)
        {
            try
            {
                foreach (BusinessObjects.InvoiceData task in e.SelectedObjects)
                {
                    var Date = DateTime.Now.ToString("yyyy-MM-dd");
                    string Url = $"https://wl-api.mf.gov.pl/api/search/nip/{task.VatNumber}?date={Date}";

                    var Client = new HttpClient();

                    var Response = Client.GetStringAsync(Url).Result;

                    var FormattedResponse = JObject.Parse(Response);

                    var CustomerName = FormattedResponse["result"]["subject"]["name"];
                    var Krs = FormattedResponse["result"]["subject"]["krs"];
                    var RegistrationLegalDate = FormattedResponse["result"]["subject"]["registrationLegalDate"];
                    var Address = FormattedResponse["result"]["subject"]["workingAddress"];

                    var address = Address.ToString();

                    var Index1 = address.IndexOf(",");

                    var Street = address.Substring(0, Index1);
                    var City = address.Substring(Index1 + 8).Trim();

                    var PostalCode = address.Substring(Index1 + 2, 6);

                    task.PostalCode = PostalCode;
                    task.City = City;
                    task.Street = Street;
                    task.CustomerName = CustomerName.ToString();
                    task.NumberInRegisterOfRecords = Krs.ToString();
                    task.DateOfEntryToRegisterOfRecords = ((DateTime)RegistrationLegalDate);
                }
            }
            catch (NullReferenceException) { }
            catch (HttpRequestException) { }
        }
    }
}

