using System.Diagnostics;
using System.Windows.Forms;

namespace AgudahProject
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        public string curFilePath;
        public string curFileName;
        private void OnSelectClicked(object sender, EventArgs e)
        {
            OpenFileDialog ofd = new OpenFileDialog();
            DialogResult result = ofd.ShowDialog();
            if (result == DialogResult.OK)
            {
                curFilePath = ofd.FileName;
                SelectedFilePath.Text= curFilePath;
                curFileName = Path.GetFileName(ofd.FileName);
                SelectedFileName.Text= curFileName;
                FileObject fO = new FileObject(curFilePath);
                fO.ParseFile();
              
                
                   
            }
        }

    
        
    }
}
