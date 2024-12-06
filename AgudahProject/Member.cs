using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AgudahProject
{
    public class Member
    {


        private string lastName;

        public string LastName
        {
            get { return lastName; }
            set { lastName = value; }
        }
        public bool Valid { get; set; }
        public string FirstName { get; set; }
        public string Address { get; set; }
        public string Address2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zip { get; set; }

        public Member(string lastName, string firstName,
            string Address,string Address2, string city, string state, string zip)
        {

            this.lastName = lastName;
            this.FirstName = firstName;
            this.Address = Address;
            this.Address2 = Address2;
            this.City=city;
            this.State = state;
            this.Zip = zip;
        }
        public string Print()
        {
            StringBuilder sb = new StringBuilder();
            sb.Append(lastName);
            sb.Append(", ");
            sb.Append(FirstName);
            sb.Append(", ");
            sb.Append(Address);
            sb.Append(", ");
            sb.Append(Address2);
            sb.Append(", ");
            sb.Append(City);
            sb.Append(", ");
            sb.Append(State);
            sb.Append(", ");
            sb.Append(Zip);
            return sb.ToString();
        }
    }
}
