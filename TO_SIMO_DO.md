# TO SIMO DO

## GitHub Pages Deployment
1.  **Commit and Push**:
    ```bash
    git add .
    git commit -m "feat: configure github pages deployment"
    git push origin main
    ```
    *Note: Ensure your remote `origin` points to `https://github.com/ServiziPerTribunali/calcolapercentuali`. If not, update it:*
    ```bash
    git remote set-url origin https://github.com/ServiziPerTribunali/calcolapercentuali.git
    ```

2.  **Enable GitHub Pages**:
    -   Go to your repository on GitHub: `https://github.com/ServiziPerTribunali/calcolapercentuali`
    -   Go to **Settings** > **Pages**.
    -   Under **Build and deployment**, usually you need to select **Source: GitHub Actions**.
        -   *Note: Since we are using a custom workflow that uploads an artifact, GitHub might detect this automatically, but checking the setting is safer.*
    -   Wait for the action to complete (check the **Actions** tab).
    -   Your site should be live at: `https://ServiziPerTribunali.github.io/calcolapercentuali/`
