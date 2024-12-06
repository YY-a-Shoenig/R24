namespace AgudahProject
{
    partial class Form1
    {
        /// <summary>
        ///  Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        ///  Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        ///  Required method for Designer support - do not modify
        ///  the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            button1 = new Button();
            label1 = new Label();
            output = new RichTextBox();
            SelectedFileName = new TextBox();
            label2 = new Label();
            SelectedFilePath = new RichTextBox();
            SuspendLayout();
            // 
            // button1
            // 
            button1.Location = new Point(326, 363);
            button1.Name = "button1";
            button1.Size = new Size(123, 39);
            button1.TabIndex = 0;
            button1.Text = "Select File";
            button1.UseVisualStyleBackColor = true;
            button1.Click += OnSelectClicked;
            // 
            // label1
            // 
            label1.AutoSize = true;
            label1.Location = new Point(26, 29);
            label1.Name = "label1";
            label1.Size = new Size(203, 25);
            label1.TabIndex = 3;
            label1.Text = "Current File (Full Path):";
            // 
            // output
            // 
            output.Location = new Point(156, 161);
            output.Name = "output";
            output.Size = new Size(501, 141);
            output.TabIndex = 4;
            output.Text = "";
            // 
            // SelectedFileName
            // 
            SelectedFileName.Location = new Point(248, 103);
            SelectedFileName.Name = "SelectedFileName";
            SelectedFileName.Size = new Size(513, 33);
            SelectedFileName.TabIndex = 6;
            // 
            // label2
            // 
            label2.AutoSize = true;
            label2.Location = new Point(26, 103);
            label2.Name = "label2";
            label2.Size = new Size(218, 25);
            label2.TabIndex = 7;
            label2.Text = "Current File (Actual File):";
            // 
            // SelectedFilePath
            // 
            SelectedFilePath.Location = new Point(248, 29);
            SelectedFilePath.Name = "SelectedFilePath";
            SelectedFilePath.ScrollBars = RichTextBoxScrollBars.ForcedBoth;
            SelectedFilePath.Size = new Size(514, 36);
            SelectedFilePath.TabIndex = 8;
            SelectedFilePath.Text = "";
            // 
            // Form1
            // 
            AutoScaleDimensions = new SizeF(11F, 25F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(880, 450);
            Controls.Add(SelectedFilePath);
            Controls.Add(label2);
            Controls.Add(SelectedFileName);
            Controls.Add(output);
            Controls.Add(label1);
            Controls.Add(button1);
            Name = "Form1";
            Text = "Agudah File Updater";
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private Button button1;
        private Label label1;
        private RichTextBox output;
        private TextBox SelectedFileName;
        private Label label2;
        private RichTextBox SelectedFilePath;
    }
}
