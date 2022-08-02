import { mount } from "@vue/test-utils";

import { beforeEach, describe, expect, it } from "vitest";

import TabsPanel from "@/components/TabsPanel.vue";

const tabNames = ["MainTab", "HeaderTab", "ContentTab"];
const tabTexts = ["MainText", "HeaderText", "ContentText"];
const tabSlots = {
  MainTab: `<div>${tabTexts[0]}</div>`,
  HeaderTab: `<div>${tabTexts[1]}</div>`,
  ContentTab: `<div>${tabTexts[2]}</div>`,
};

const defaultTabClasses = ["border-b-2", "px-4", "pt-2", "transition-all", "hover:bg-slate-200"];
const activeTabClasses = ["border-purple-600", "text-purple-600"];

describe("TabsPanel.test.js vitest", () => {
  beforeEach(() => {
    expect(TabsPanel).toBeTruthy();
  });
  it("check default state", () => {
    const wrapper = mount(TabsPanel, { props: { tabs: ["Tab 1", "Tab 2"] } });
    expect(wrapper.text()).contains("Tab 1");
    expect(wrapper.text()).contains("Tab 2");
  });
  it("check the tabs depending on content", () => {
    const wrapper = mount(TabsPanel, { props: { tabs: tabNames }, slots: tabSlots });
    const tabs = wrapper.findAll("[data-testid=tab-button]");
    expect(tabs.length).toBe(tabNames.length);
    const activeTabIndex = 0;
    tabs.forEach((tab, index) => {
      expect(tab.text()).toBe(tabNames[index]);
      let currentTabClasses = defaultTabClasses;
      // if active tab - then add classes for active tab
      if (index == activeTabIndex) currentTabClasses = currentTabClasses.concat(activeTabClasses);
      expect(tab.classes()).toEqual(currentTabClasses);
    });
  });
});

describe("Tabs behavioral model", async () => {
  let wrapper = null;
  beforeEach(() => {
    expect(TabsPanel).toBeTruthy();
    wrapper = mount(TabsPanel, {
      props: { tabs: tabNames },
      slots: tabSlots,
    });
  });
  it("check active tab change", async () => {
    const tabs = wrapper.findAll("[data-testid=tab-button]");
    for (let index = 0; index < tabs.length; index++) {
      const tab = tabs[index];
      await tab.trigger("click");
      const currentTabClasses = defaultTabClasses.concat(activeTabClasses);
      // check current tab classes
      expect(tab.classes()).toEqual(currentTabClasses);
      // check other tab classes, as they no more active
      tabs
        .filter((t, tabIndex) => tabIndex != index)
        .forEach((notCurrentTab) => {
          expect(notCurrentTab.classes()).toEqual(defaultTabClasses);
        });
      expect(wrapper.html()).toContain(tabTexts[index]);
    }
  });
});
