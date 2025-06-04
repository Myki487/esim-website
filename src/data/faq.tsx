import React from 'react';
import { FaqItem } from "@/types/FaqItem"

export const troubleshootingFaqs: FaqItem[] = [
	{ 
		question: 'I can’t scan my QR code, what do I do?', 
		answer: (
			<div>
        <p className="mb-2 font-semibold">There are several reasons why you might be unable to scan your QR code with the Travel Roam app. Here’s a few things you can do to resolve the problem:</p>
				<ul className="list-disc list-inside space-y-1 mt-2">
              {[
                "Check to make sure that your phone is compatible with an eSIM. Some older models of mobile aren’t compatible.", 
                "Check your QR code to verify it is legitimate. Look for any signs of damage or incomplete lines. If the problem persists, obtain a new code.", 
                "Make sure that your eSIM is activated from your phone settings.", 
                "Ensure that you scan the code in good lighting conditions - poor lighting can interfere with a clean scan.", 
                "Move your phone closer to the QR code, and if possible, align it with the markers on the camera.", 
                "Try and restart your phone and see if the problem corrects itself."
              ].map((model) => (
                <li key={model}>{model}</li>
              ))}
            </ul>
					<p className="mb-2 font-semibold">If you still can’t scan the QR code, please contact a Travel Roam team member for more assistance.</p>
			</div>
		)
	},

  { 
    question: 'How do I check that I have the correct eSIM activated or enabled?', 
    answer: (
      <div>
        <p>You will need to check your phone settings to identify whether or not you have the correct eSIM enabled. The steps to do so for each type of device are listed below:</p>

        <h4 className="font-semibold mt-3 mb-1">iOS Devices:</h4>
        <ol className="list-decimal list-inside space-y-1">
          <li>Go to the Settings app.</li>
          <li>Go into the section marked ‘Mobile Data’.</li>
          <li>Click the eSIM you want to use.</li>
          <li>Make sure the toggle button for ‘Turn On This Line’ is green.</li>
          <li>Once these steps are complete, your eSIM should be on.</li>
        </ol>

        <h4 className="font-semibold mt-3 mb-1">Android Devices:</h4>
        <ol className="list-decimal list-inside space-y-1">
          <li>Go to the Settings app.</li>
          <li>Go to the section marked ‘SIM Cards and Mobile Networks’.</li>
          <li>Navigate down to the section marked ‘Manage eSIM’.</li>
          <li>In this section, ensure that the correct eSIM is enabled. If the eSIM is not turned on, turn it on.</li>
          <li>If you’re not sure which eSIM is the right one for your device, contact your network provider to find out. Alternatively, if you switch off each eSIM sequentially, you can determine which ones you need through a process of trial and error.</li>
        </ol>
      </div>
    )
  },

  { 
    question: 'How do I tell if my eSIM is installed?', 
    answer: (
      <div>
        <p>The process for checking if your eSIM is activated is similar to turning it on. Let’s look at instructions for both devices again:</p>

        <h4 className="font-semibold mt-3 mb-1">Apple iOS devices:</h4>
        <ol className="list-decimal list-inside space-y-1">
          <li>Go to the Settings app.</li>
          <li>Go into the section marked ‘Mobile Data’.</li>
          <li>If your eSIM is installed in the phone, it will be displayed in the menu.</li>
          <li>Make sure the toggle button for ‘Turn On This Line’ is green.</li>
        </ol>

        <h4 className="font-semibold mt-3 mb-1">Android Devices:</h4>
        <ol className="list-decimal list-inside space-y-1">
          <li>Go into the Settings app.</li>
          <li>Go to the section marked ‘SIM Cards and Mobile Networks’.</li>
          <li>Navigate down to the section marked ‘Manage eSIM’.</li>
          <li>In this section, ensure that the correct eSIM is enabled. If the eSIM is not turned on, turn it on now.</li>
          <li>If you are not sure whether or not your eSIM is still installed, contact your network provider.</li>
        </ol>
      </div>
    )
  },

  { 
    question: 'Why has my home SIM stopped working after activating my eSIM?', 
    answer: (
      <div>
        <p>If you install an eSIM and the physical SIM card in your phone stops working, there are a number of things you can do to try and fix the problem:</p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          {[
            "Ensure that your SIM card is inserted properly, as a loose or badly inserted SIM can cause connection issues.",
            "Check your device settings to ensure that your SIM is still activated - you may have accidentally turned it off.",
            "Restart your device, and see if this fixes the issues with the SIM card.",
            "Remove and reinsert the SIM card if the issue still persists.",
            "If all else fails, contact your carrier and see if they can resolve the issue for you.",
            "In some cases, you can’t have both a physical and digital SIM in the same handset."
          ].map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    )
  },

  { 
    question: 'Why has my iMessage stopped working once I’ve installed my eSIM?', 
    answer: (
      <div>
        <p>If installing your eSIM creates an issue with your iMessage, there are a few things you can do to resolve the problem:</p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          {[
            "Ensure that your eSIM is installed and working properly - speak to your carrier if you have concerns.",
            "Check your iMessage settings through your phone to see if it has been accidentally disabled.",
            "Turn your device on and off to reset it and see if this fixes the issue.",
            "Check your network settings. Ensure that you have either a working WiFi connection or cellular coverage.",
            "Update your device to the latest version of iOS.",
            "If these solutions don’t fix the problem, you may need to contact Apple Support."
          ].map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    )
  },
]

export const generalFaqs: FaqItem[] = [
  { 
    question: 'How do I send an iMessage when I’m using an eSIM?', 
    answer: (
      <div>
        <p>Anyone who has an Apple device will most likely use iMessage at least once. For some, it’s their primary method of communication. This type of service is normally bound directly to a phone number, and typically the primary SIM card inside your device.</p>
        <p>If you do install an eSIM into your device, then you can still use your iMessage functions. However, the following criteria need to be met:</p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li>Your line which has the SIM that originally had the iMessage function needs to stay switched on at all times.</li>
          <li>Your data roaming package needs to be turned off on your primary SIM to ensure that your eSIM is used for data only.</li>
        </ul>
        <p>With these guidelines in place, you can still receive messages through your phone number as normal.</p>
      </div>
    )
  },

  { 
    question: 'Can I install an eSIM on a Gemini PDA?', 
    answer: (
      <div>
        <p>The Gemini PDA is a device which has dual SIM capability. This means that it can support both an eSIM and a normal SIM card. You can put an eSIM on a Gemini PDA by following these instructions:</p>
        <ol className="list-decimal list-inside space-y-1 mt-2">
          <li>Ensure that the device is compatible by looking at the user specs.</li>
          <li>Get an activation code for your eSIM.</li>
          <li>Open up the settings on the device and find where you can add the option to use two SIM devices.</li>
          <li>Select which of the SIMs you want to use as the primary for all calls and messages.</li>
        </ol>
      </div>
    )
  },

  { 
    question: 'How can I save or use less data with my eSIM?', 
    answer: (
      <div>
        <p>There are a few things that you can do to ensure that your data usage is kept to a minimum. Here’s some you can implement now:</p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li>Play video files in a lower resolution to reduce the amount of data you use.</li>
          <li>Ensure that background apps and processes are not in use to cut down on data use.</li>
          <li>Disable auto-play to stop videos generating on their own.</li>
          <li>Where possible, connect to wi-fi and use that for all the “heavy lifting”.</li>
          <li>Download videos and shows to watch offline without data.</li>
        </ul>
      </div>
    )
  },

  { 
    question: 'Can I access social media platforms with my eSIM?', 
    answer: (
      <div>
        <p>As your eSIM functions by using data we provide, it is easy for you to be able to access normal social media platforms if you’re connected. Facebook, Twitter, Instagram and more are all freely available.</p>
      </div>
    )
  },

  { 
    question: 'Why do I bother with an eSIM for my business travels?', 
    answer: (
      <div>
        <p>There’s definitely quite a few benefits to going for an eSIM for your business travels. Let’s talk about some of them together:</p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li>eSIM plans are convenient and easy to use, taking hassle away.</li>
          <li>There’s no risk of having your normal data plan be eaten up by business needs while travelling.</li>
          <li>The data plan is more secure than connecting to public wifi everywhere you go.</li>
          <li>Check your network settings. Ensure that you have either a working WiFi connection or cellular coverage.</li>
          <li>Your eSIM will be more reliable than a typical SIM card which can become damaged or break - an eSIM will not.</li>
        </ul>
      </div>
    )
  },
]

export const managingEsimFaqs: FaqItem[] = [
  { 
    question: 'How long will it take for my eSIM to arrive?', 
    answer: (
      <div>
        <p>Once you have purchased your eSIM, you’ll need to wait 2-3 minutes on average for the eSIM to be sent. The installation process doesn’t take long as most settings automatically configure for you - on average, you can be connected in 10 minutes.</p>
        <p>You should try to avoid cancelling or leaving the installation before it is complete, as this will restart the process.</p>
      </div>
    )
  },

  { 
    question: 'How much will my eSIM cost to use?', 
    answer: (
      <div>
        <p>The exact price that you’ll pay for your eSIM will depend on the country you’re in and how much data you want to use. On average, you can expect to pay between £10 and £15 in the local currency for each day of usage. Naturally, more data-intensive tasks will cost more.</p>
      </div>
    )
  },

  { 
    question: 'When can I activate my eSIM before my trip?', 
    answer: (
      <div>
        <p>The validity period for your eSIM is more than six months before you activate it, so you can purchase your plan and install it well in advance if you wish.</p>
        <p>You will need to remember to activate it before you go, however. This will save you any unforeseen hassle before you go away.</p>
      </div>
    )
  },

  { 
    question: 'Can I use two eSIMs at the same time?', 
    answer: (
      <div>
        <p>If you need two different numbers on a single device for business reasons, it can be useful to have two eSIMs working at the same time. However, there are only a handful of devices that can support this feature.</p>
        <p>Here’s what you can do to use both eSIMs at once:</p>
        <ol className="list-decimal list-inside space-y-1 mt-2">
          <li>Check your device manual or specs to see if it can support dual eSIM devices. If it does, you can enable them.</li>
          <li>Activate both eSIMs by speaking to any carrier involved - you may need a special code or other verification to do so.</li>
          <li>Enable the use of a dual eSIM from the menu. Doing this will depend on what type of device you have.</li>
          <li>Make sure that you assign one SIM as the primary card that is used for calls and texts, and the other for your data plan.</li>
          <li>Check that both eSIMs are active and can be used in conjunction with each other.</li>
        </ol>
        <p>It’s probably worth noting that two eSIMs at once will affect your battery life, but that is easy to manage with prior planning.</p>
      </div>
    )
  },

  { 
    question: 'Can I use a home SIM card with my eSIM?', 
    answer: (
      <div>
        <p>Yes, you can use both a home SIM card and eSIM if you want. There’s nothing to stop you from doing so but there are things to consider.</p>
        <p>If you want to use two SIM cards at once, regardless of what they are, you need a device which can support that. If you have an older model this may be inaccessible to you.</p>
        <p>Once you have set both SIM cards up, you can choose which one you want to use for individual tasks.</p>
      </div>
    )
  },
]
