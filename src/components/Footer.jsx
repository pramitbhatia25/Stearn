function Footer() {
    return <>
        <footer className="w-full ">
            <div className=" mx-auto px-4 py-10 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Links Section */}
                    <div>
                        <h2 className="text-lg font-semibold text-white">Quick Links</h2>
                        <ul className="mt-2 space-y-2">
                            <li>
                                <a
                                    href="#"
                                    className="hover:underline hover:text-white transition"
                                >
                                    Home
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.linkedin.com/company/stearncrypto/"
                                    className="hover:underline hover:text-white transition"
                                >
                                    LinkedIn
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://x.com/stearnswap"
                                    className="hover:underline hover:text-white transition"
                                >
                                    X / Twitter
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div>
                        <h2 className="text-lg font-semibold text-white">Contact</h2>
                        <ul className="mt-2 space-y-2">
                            <li>
                                <a
                                    href="#"
                                    className="hover:underline hover:text-white transition"
                                >
                                    Email: hello@stearn.link
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://calendly.com/prashanthkonda"
                                    className="underline"
                                >
                                    Book A Meeting
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-4 text-center">
                    <p className="text-sm">
                        &copy; {new Date().getFullYear()} Kapstone. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    </>
}

export default Footer;