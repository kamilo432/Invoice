using DevExpress.Persistent.Base;
using DevExpress.Persistent.BaseImpl;
using DevExpress.Xpo;

namespace Invoice.Module.BusinessObjects
{
    [NavigationItem("Invoice Data")]
    public class Invoice : BaseObject
    {
        public Invoice(Session session) : base(session)
        {
        }
        string symbol;
        public string Symbol
        {
            get { return symbol; }
            set { SetPropertyValue(nameof(Symbol), ref symbol, value); }
        }
        string vatNumber;
        public string VatNumber
        {
            get { return vatNumber; }
            set { SetPropertyValue(nameof(VatNumber), ref vatNumber, value); }
        }
        string customerName;
        public string CustomerName
        {
            get { return customerName; }
            set { SetPropertyValue(nameof(CustomerName), ref customerName, value); }
        }
        string street;
        public string Street
        {
            get { return street; }
            set { SetPropertyValue(nameof(Street), ref street, value); }
        }
        string city;
        public string City
        {
            get { return city; }
            set { SetPropertyValue(nameof(City), ref city, value); }
        }
        string postalCode;
        public string PostalCode
        {
            get { return postalCode; }
            set { SetPropertyValue(nameof(PostalCode), ref postalCode, value); }
        }
        string email;
        public string Email
        {
            get { return email; }
            set { SetPropertyValue(nameof(Email), ref email, value); }
        }
        string phone;
        public string Phone
        {
            get { return phone; }
            set { SetPropertyValue(nameof(Phone), ref phone, value); }
        }
        string segment;
        public string Segment
        {
            get { return segment; }
            set { SetPropertyValue(nameof(Segment), ref segment, value); }
        }
        string manager;
        public string Manager
        {
            get { return manager; }
            set { SetPropertyValue(nameof(Manager), ref manager, value); }
        }
        string numberInRegisterOfRecords;
        public string NumberInRegisterOfRecords
        {
            get { return numberInRegisterOfRecords; }
            set { SetPropertyValue(nameof(NumberInRegisterOfRecords), ref numberInRegisterOfRecords, value); }
        }
        private DateTime dateOfCreation;
        public DateTime DateOfCreation
        {
            get { return dateOfCreation; }
            set { SetPropertyValue(nameof(DateOfCreation), ref dateOfCreation, value); }
        }
        private DateTime dateOfCommencementBusiness;
        public DateTime DateOfCommencementBusiness
        {
            get { return dateOfCommencementBusiness; }
            set { SetPropertyValue(nameof(DateOfCommencementBusiness), ref dateOfCommencementBusiness, value); }
        }
        private DateTime dateOfEntryToRegon;
        public DateTime DateOfEntryToRegon
        {
            get { return dateOfEntryToRegon; }
            set { SetPropertyValue(nameof(DateOfEntryToRegon), ref dateOfEntryToRegon, value); }
        }
        private DateTime dateOfEntryToRegisterOfRecords;
        public DateTime DateOfEntryToRegisterOfRecords
        {
            get { return dateOfEntryToRegisterOfRecords; }
            set { SetPropertyValue(nameof(DateOfEntryToRegisterOfRecords), ref dateOfEntryToRegisterOfRecords, value); }
        }
        private DateTime dateOfChangeOccurrence;
        public DateTime DateOfChangeOccurrence
        {
            get { return dateOfChangeOccurrence; }
            set { SetPropertyValue(nameof(DateOfChangeOccurrence), ref dateOfChangeOccurrence, value); }
        }
    }
}
